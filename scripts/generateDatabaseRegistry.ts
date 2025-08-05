#!/usr/bin/env ts-node

import { readdir, readFile, writeFile, stat } from 'fs/promises';
import { join, extname, basename } from 'path';
import { existsSync } from 'fs';
import Redis from 'ioredis';

interface RegistryItem {
    name: string;
    type: string;
    description: string;
    tier: 'free' | 'pro';
    version: string;
    files: {
        path: string;
        type: string;
        content?: string;
    }[];
    dependencies?: string[];
    shadcnDependencies?: string[];
    createdAt: string;
    updatedAt: string;
}

interface DatabaseRegistry {
    version: string;
    lastUpdated: string;
    components: {
        free: RegistryItem[];
        pro: RegistryItem[];
    };
    metadata: {
        totalComponents: number;
        freeComponents: number;
        proComponents: number;
    };
}

// Component tier mappings - all source code stays in repo
const COMPONENT_TIERS: Record<string, 'free' | 'pro'> = {
    // Free components (open source)
    'ai-branch': 'free',
    'ai-conversation': 'free',
    'ai-input': 'free',
    'ai-message': 'free',
    'ai-response': 'free',
    'ai-simple': 'free',
    'code-block': 'free',
    'editor': 'free',
    'snippet': 'free',

    // Pro components (still in repo, but gated via database)
    'ai-reasoning': 'pro',
    'ai-server': 'pro',
    'ai-source': 'pro',
    'ai-suggestion': 'pro',
    'ai-tool': 'pro',
};

const COMPONENT_DESCRIPTIONS: Record<string, string> = {
    // Free components
    'ai-branch': 'AI conversation branch component for displaying branched conversations',
    'ai-conversation': 'AI conversation container component',
    'ai-input': 'AI chat input component with advanced features',
    'ai-message': 'AI message display component',
    'ai-response': 'AI response component with streaming support',
    'ai-simple': 'Simple AI component for basic interactions',
    'code-block': 'Enhanced code block component with syntax highlighting',
    'editor': 'Code editor component',
    'snippet': 'Code snippet component',

    // Pro components (descriptions only, source stays in repo)
    'ai-reasoning': 'Advanced AI reasoning visualization with step-by-step thought processes',
    'ai-server': 'Server-side AI component utilities with caching and rate limiting',
    'ai-source': 'Advanced AI source attribution with citation management and verification',
    'ai-suggestion': 'Intelligent AI suggestion engine with learning capabilities and personalization',
    'ai-tool': 'Advanced AI tool component with custom function calling and workflow automation',
};

// Database connection
let redis: Redis | null = null;

async function getRedisConnection(): Promise<Redis> {
    if (!redis) {
        redis = new Redis({
            host: process.env.REDIS_HOST || 'localhost',
            port: parseInt(process.env.REDIS_PORT || '6379'),
            password: process.env.REDIS_PASSWORD,
            enableOfflineQueue: false,
            lazyConnect: true,
            connectTimeout: 10000,
            commandTimeout: 5000,
        });
    }
    return redis;
}

function getComponentTier(packageName: string, fileName: string): 'free' | 'pro' {
    if (packageName === 'ai') {
        const componentName = `ai-${fileName}`;
        return COMPONENT_TIERS[componentName] || 'free';
    }
    return COMPONENT_TIERS[packageName] || 'free';
}

function getComponentDescription(packageName: string, fileName: string): string {
    if (packageName === 'ai') {
        const componentName = `ai-${fileName}`;
        return COMPONENT_DESCRIPTIONS[componentName] || `AI ${fileName} component`;
    }
    return COMPONENT_DESCRIPTIONS[packageName] || `${packageName} component`;
}

function isComponentFile(fileName: string): boolean {
    const validExtensions = ['.tsx', '.ts'];
    return validExtensions.includes(extname(fileName)) && !fileName.includes('.test.') && !fileName.includes('.spec.');
}

// Extract dependencies from component content
function extractDependencies(content: string): { dependencies: string[]; shadcnDependencies: string[] } {
    const dependencies = new Set<string>();
    const shadcnDependencies = new Set<string>();

    // Extract import statements
    const importRegex = /import\s+(?:{[^}]*}|[^\s,]+|\*\s+as\s+\w+)\s+from\s+['"]([^'"]+)['"]/g;
    let match;

    while ((match = importRegex.exec(content)) !== null) {
        const importPath = match[1];

        // Skip relative imports, built-in modules, and local alias imports
        if (importPath.startsWith('.') || importPath.startsWith('node:') || importPath.startsWith('@/')) {
            // Check for shadcn/ui components
            if (importPath.startsWith('@/components/ui/')) {
                const componentName = importPath.replace('@/components/ui/', '');
                shadcnDependencies.add(componentName);
            }
            continue;
        }

        // Handle scoped packages and regular packages
        const packageName = importPath.startsWith('@')
            ? importPath.split('/').slice(0, 2).join('/')
            : importPath.split('/')[0];

        // Skip React, Next.js, and workspace packages
        if (['react', 'react-dom', 'next'].includes(packageName) || packageName.startsWith('@repo/')) {
            continue;
        }

        dependencies.add(packageName);
    }

    return {
        dependencies: Array.from(dependencies),
        shadcnDependencies: Array.from(shadcnDependencies)
    };
}

async function scanPackageDirectory(packagePath: string, packageName: string): Promise<RegistryItem[]> {
    const items: RegistryItem[] = [];

    try {
        const files = await readdir(packagePath);
        const componentFiles = files.filter(isComponentFile);

        if (componentFiles.length === 0) {
            console.warn(`No component files found in package: ${packageName}`);
            return items;
        }

        // For AI package, create separate items for each component file
        if (packageName === 'ai') {
            for (const file of componentFiles) {
                const baseName = basename(file, extname(file));
                const componentName = `ai-${baseName}`;
                const tier = getComponentTier('ai', baseName);
                const filePath = join(packagePath, file);
                const content = await readFile(filePath, 'utf-8');
                const { dependencies, shadcnDependencies } = extractDependencies(content);

                items.push({
                    name: componentName,
                    type: 'registry:ui',
                    tier,
                    version: '1.0.0', // Could be extracted from package.json
                    description: getComponentDescription('ai', baseName),
                    files: [{
                        path: `packages/${packageName}/${file}`,
                        type: 'registry:component',
                        content // Store content in database for serving
                    }],
                    dependencies,
                    shadcnDependencies,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                });
            }
        } else {
            // For other packages, use the main file or index file
            const mainFile = componentFiles.find(f => f === 'index.tsx' || f === 'index.ts') || componentFiles[0];
            const componentName = packageName;
            const tier = getComponentTier(packageName, mainFile);
            const filePath = join(packagePath, mainFile);
            const content = await readFile(filePath, 'utf-8');
            const { dependencies, shadcnDependencies } = extractDependencies(content);

            items.push({
                name: componentName,
                type: 'registry:ui',
                tier,
                version: '1.0.0',
                description: getComponentDescription(packageName, mainFile),
                files: [{
                    path: `packages/${packageName}/${mainFile}`,
                    type: 'registry:component',
                    content
                }],
                dependencies,
                shadcnDependencies,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
        }

    } catch (error) {
        console.error(`Error scanning package ${packageName}:`, error);
    }

    return items;
}

// Store registry in Redis with proper keys
async function storeRegistryInDatabase(registry: DatabaseRegistry): Promise<void> {
    const redis = await getRedisConnection();

    try {
        // Store complete registry
        await redis.set('dedevs:registry:complete', JSON.stringify(registry));

        // Store free components only (public access)
        const freeRegistry = {
            version: registry.version,
            lastUpdated: registry.lastUpdated,
            components: registry.components.free,
            metadata: {
                totalComponents: registry.components.free.length,
                freeComponents: registry.components.free.length,
                proComponents: 0
            }
        };
        await redis.set('dedevs:registry:free', JSON.stringify(freeRegistry));

        // Store individual components for faster access
        for (const component of [...registry.components.free, ...registry.components.pro]) {
            await redis.set(`dedevs:component:${component.name}`, JSON.stringify(component));

            // Store component metadata separately for listing
            const metadata = {
                name: component.name,
                description: component.description,
                tier: component.tier,
                version: component.version,
                updatedAt: component.updatedAt
            };
            await redis.set(`dedevs:component:meta:${component.name}`, JSON.stringify(metadata));
        }

        // Store component lists by tier
        await redis.set('dedevs:components:free', JSON.stringify(registry.components.free.map(c => c.name)));
        await redis.set('dedevs:components:pro', JSON.stringify(registry.components.pro.map(c => c.name)));

        // Set expiration for cache invalidation (24 hours)
        const expiration = 24 * 60 * 60; // 24 hours in seconds
        await redis.expire('dedevs:registry:complete', expiration);
        await redis.expire('dedevs:registry:free', expiration);

        console.log('✅ Registry stored in Redis successfully');
        console.log(`📊 Stored ${registry.components.free.length} free components`);
        console.log(`🔒 Stored ${registry.components.pro.length} pro components`);

    } catch (error) {
        console.error('❌ Failed to store registry in Redis:', error);
        throw error;
    }
}

// Generate and store registries in database
async function generateDatabaseRegistry(): Promise<void> {
    const packagesDir = join(process.cwd(), 'packages');

    if (!existsSync(packagesDir)) {
        console.error('Packages directory not found');
        return;
    }

    const allItems: RegistryItem[] = [];
    const packageDirs = await readdir(packagesDir);

    console.log('🔍 Scanning packages...');

    // Scan all packages
    for (const packageDir of packageDirs) {
        const packagePath = join(packagesDir, packageDir);
        const packageStat = await stat(packagePath);

        if (packageStat.isDirectory()) {
            console.log(`  📦 Scanning ${packageDir}...`);
            const items = await scanPackageDirectory(packagePath, packageDir);
            allItems.push(...items);
        }
    }

    // Separate items by tier
    const freeItems = allItems.filter(item => item.tier === 'free');
    const proItems = allItems.filter(item => item.tier === 'pro');

    // Create database registry structure
    const databaseRegistry: DatabaseRegistry = {
        version: '1.0.0',
        lastUpdated: new Date().toISOString(),
        components: {
            free: freeItems,
            pro: proItems
        },
        metadata: {
            totalComponents: allItems.length,
            freeComponents: freeItems.length,
            proComponents: proItems.length
        }
    };

    // Store in database
    console.log('💾 Storing registry in database...');
    await storeRegistryInDatabase(databaseRegistry);

    // Also generate static files for fallback
    console.log('📄 Generating static fallback files...');

    const staticFreeRegistry = {
        $schema: 'https://ui.shadcn.com/schema/registry.json',
        name: 'dedevs-ui',
        homepage: 'https://ui.dedevs.com',
        items: freeItems.map(item => ({
            name: item.name,
            type: item.type,
            description: item.description,
            files: item.files.map(f => ({ path: f.path, type: f.type })) // Remove content for static files
        }))
    };

    await writeFile('registry.json', JSON.stringify(staticFreeRegistry, null, 2));

    console.log(`✅ Generated database registry with ${allItems.length} components`);
    console.log(`   📖 Free: ${freeItems.length} components`);
    console.log(`   🔒 Pro: ${proItems.length} components`);
    console.log('🌐 Static fallback registry.json created');
}

// Utility function to retrieve components from database
export async function getComponentFromDatabase(componentName: string, userTier: 'free' | 'pro' = 'free'): Promise<RegistryItem | null> {
    const redis = await getRedisConnection();

    try {
        const componentData = await redis.get(`dedevs:component:${componentName}`);

        if (!componentData) {
            return null;
        }

        const component: RegistryItem = JSON.parse(componentData);

        // Check access permissions
        if (component.tier === 'pro' && userTier === 'free') {
            // Return metadata only for pro components to free users
            return {
                ...component,
                files: component.files.map(f => ({ ...f, content: undefined }))
            };
        }

        return component;
    } catch (error) {
        console.error('Failed to retrieve component from database:', error);
        return null;
    }
}

// Run the script if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    generateDatabaseRegistry().catch(console.error);
}

export { generateDatabaseRegistry, storeRegistryInDatabase };

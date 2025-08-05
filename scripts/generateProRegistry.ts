#!/usr/bin/env ts-node

import { readdir, readFile, writeFile, stat } from 'fs/promises';
import { join, extname, basename } from 'path';
import { existsSync } from 'fs';

interface RegistryItem {
    name: string;
    type: string;
    description: string;
    tier: 'free' | 'pro';
    files: {
        path: string;
        type: string;
    }[];
}

interface Registry {
    $schema: string;
    name: string;
    homepage: string;
    items: RegistryItem[];
}

// Component tier mappings
const COMPONENT_TIERS: Record<string, 'free' | 'pro'> = {
    // Free components
    'ai-branch': 'free',
    'ai-conversation': 'free',
    'ai-input': 'free',
    'ai-message': 'free',
    'ai-response': 'free',
    'ai-simple': 'free',
    'code-block': 'free',
    'editor': 'free',
    'snippet': 'free',

    // Pro components
    'ai-advanced-chat': 'pro',
    'ai-code-review': 'pro',
    'ai-data-visualization': 'pro',
    'ai-reasoning': 'pro',
    'ai-server': 'pro',
    'ai-source': 'pro',
    'ai-suggestion': 'pro',
    'ai-tool': 'pro',
    'premium-dashboard': 'pro',
    'advanced-analytics': 'pro',
};

// Enhanced descriptions for pro components
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

    // Pro components
    'ai-advanced-chat': 'Advanced AI chat interface with multi-model support, conversation branching, and export features',
    'ai-code-review': 'AI-powered code review component with diff visualization and suggestion management',
    'ai-data-visualization': 'Interactive data visualization component with AI-generated insights and charts',
    'ai-reasoning': 'Advanced AI reasoning visualization with step-by-step thought processes',
    'ai-server': 'Server-side AI component utilities with caching and rate limiting',
    'ai-source': 'Advanced AI source attribution with citation management and verification',
    'ai-suggestion': 'Intelligent AI suggestion engine with learning capabilities and personalization',
    'ai-tool': 'Advanced AI tool component with custom function calling and workflow automation',
    'premium-dashboard': 'Professional dashboard with advanced analytics and customization',
    'advanced-analytics': 'Comprehensive analytics suite with real-time data processing',
};

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

// Check if a file is a valid TypeScript/TSX component file
function isComponentFile(fileName: string): boolean {
    const validExtensions = ['.tsx', '.ts'];
    return validExtensions.includes(extname(fileName)) && !fileName.includes('.test.') && !fileName.includes('.spec.');
}

// Scan a package directory for component files with tier information
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

                items.push({
                    name: componentName,
                    type: 'registry:ui',
                    tier,
                    description: getComponentDescription('ai', baseName),
                    files: [{
                        path: `packages/${packageName}/${file}`,
                        type: 'registry:component'
                    }]
                });
            }
        } else {
            // For other packages, use the main file or index file
            const mainFile = componentFiles.find(f => f === 'index.tsx' || f === 'index.ts') || componentFiles[0];
            const componentName = packageName;
            const tier = getComponentTier(packageName, mainFile);

            items.push({
                name: componentName,
                type: 'registry:ui',
                tier,
                description: getComponentDescription(packageName, mainFile),
                files: [{
                    path: `packages/${packageName}/${mainFile}`,
                    type: 'registry:component'
                }]
            });
        }

    } catch (error) {
        console.error(`Error scanning package ${packageName}:`, error);
    }

    return items;
}

// Generate registries for both free and pro tiers
async function generateRegistries(): Promise<void> {
    const packagesDir = join(process.cwd(), 'packages');

    if (!existsSync(packagesDir)) {
        console.error('Packages directory not found');
        return;
    }

    const allItems: RegistryItem[] = [];
    const packageDirs = await readdir(packagesDir);

    // Scan all packages
    for (const packageDir of packageDirs) {
        const packagePath = join(packagesDir, packageDir);
        const packageStat = await stat(packagePath);

        if (packageStat.isDirectory()) {
            const items = await scanPackageDirectory(packagePath, packageDir);
            allItems.push(...items);
        }
    }

    // Separate items by tier
    const freeItems = allItems.filter(item => item.tier === 'free');
    const proItems = allItems.filter(item => item.tier === 'pro');

    // Generate free registry
    const freeRegistry: Registry = {
        $schema: 'https://ui.shadcn.com/schema/registry.json',
        name: 'dedevs-ui',
        homepage: 'https://ui.dedevs.com',
        items: freeItems
    };

    // Generate pro registry (includes both free and pro)
    const proRegistry: Registry = {
        $schema: 'https://ui.shadcn.com/schema/registry.json',
        name: 'dedevs-ui-pro',
        homepage: 'https://pro.ui.dedevs.com',
        items: allItems
    };

    // Write registries
    await writeFile('registry.json', JSON.stringify(freeRegistry, null, 2));
    await writeFile('registry-pro.json', JSON.stringify(proRegistry, null, 2));

    console.log(`Generated free registry with ${freeItems.length} components`);
    console.log(`Generated pro registry with ${allItems.length} components (${proItems.length} pro-only)`);
}

// Run the script if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    generateRegistries().catch(console.error);
}

export { generateRegistries };

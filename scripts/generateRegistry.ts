#!/usr/bin/env ts-node

import { readdir, readFile, writeFile, stat } from 'fs/promises';
import { join, extname, basename } from 'path';
import { existsSync } from 'fs';

interface RegistryItem {
    name: string;
    type: string;
    description: string;
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

// Component type mappings based on package names
const COMPONENT_DESCRIPTIONS: Record<string, string> = {
    // ai
    'ai-branch': 'AI conversation branch component for displaying branched conversations',
    'ai-conversation': 'AI conversation container component',
    'ai-input': 'AI chat input component with advanced features',
    'ai-message': 'AI message display component',
    'ai-reasoning': 'AI reasoning visualization component',
    'ai-response': 'AI response component with streaming support',
    'ai-server': 'AI server component utilities',
    'ai-simple': 'Simple AI component for basic interactions',
    'ai-source': 'AI source attribution component',
    'ai-suggestion': 'AI suggestion component for prompts and recommendations',
    'ai-tool': 'AI tool component for function calling interfaces',
    // utilities
    'code-block': 'Enhanced code block component with syntax highlighting',
    'code-editor': 'Code editor component',
    'code-snippet': 'Code snippet component',
    // defi
    // 'ticker': 'Ticker component for displaying real-time data',
};

// Get description for a component, with fallback
function getComponentDescription(packageName: string, fileName: string): string {
    if (packageName === 'ai') {
        const componentName = `ai-${fileName}`;
        return COMPONENT_DESCRIPTIONS[componentName] || `AI ${fileName} component`;
    }
    else if (packageName === 'code') {
        const componentName = `code-${fileName}`;
        return COMPONENT_DESCRIPTIONS[componentName] || `Code ${fileName} component`;
    }
    return COMPONENT_DESCRIPTIONS[packageName] || `${packageName} component`;
}

// Extract component name from package name
function getComponentName(packageName: string): string {
    if (packageName === 'ai') {
        return 'ai-simple'; // Default AI component name
    }
    else if (packageName === 'code') {
        return 'code-block'; // Default Code component name
    }
    return packageName.startsWith('ai')
        ? `ai-${packageName.replace('ai', '').replace(/^-/, '')}`
        : packageName.startsWith('code')
            ? `code-${packageName.replace('code', '').replace(/^-/, '')}`
            : packageName;
}

// Check if a file is a valid TypeScript/TSX component file
function isComponentFile(fileName: string): boolean {
    const ext = extname(fileName);
    return (ext === '.ts' || ext === '.tsx') && !fileName.includes('.test.') && !fileName.includes('.spec.');
}

// Scan a package directory for component files
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
                // Get component name from package name
                const componentName = getComponentName(`ai-${baseName}`);

                items.push({
                    name: componentName,
                    type: 'registry:ui',
                    description: getComponentDescription('ai', baseName),
                    files: [{
                        path: `packages/${packageName}/${file}`,
                        type: 'registry:component'
                    }]
                });
            }
            // For Code package, create separate items for each component file
        } else if (packageName === 'code') {
            for (const file of componentFiles) {
                const baseName = basename(file, extname(file));
                // Get component name from package name
                const componentName = getComponentName(`code-${baseName}`);

                items.push({
                    name: componentName,
                    type: 'registry:ui',
                    description: getComponentDescription('code', baseName),
                    files: [{
                        path: `packages/${packageName}/${file}`,
                        type: 'registry:component'
                    }]
                });
            }
        } else {
            // For other packages, use the main file or index file
            const mainFile = componentFiles.find(f => f === 'index.tsx' || f === 'index.ts') || componentFiles[0];
            // Get component name from package name
            const componentName = getComponentName(packageName);

            items.push({
                name: componentName,
                type: 'registry:ui',
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

// Main function to generate the registry
async function generateRegistry(): Promise<void> {
    const packagesDir = join(process.cwd(), 'packages');
    const registryPath = join(process.cwd(), 'registry.json');

    if (!existsSync(packagesDir)) {
        console.error('Packages directory not found!');
        process.exit(1);
    }

    console.log('🔍 Scanning packages directory...');

    try {
        const packages = await readdir(packagesDir);
        const allItems: RegistryItem[] = [];

        // Filter out non-directory items and excluded packages
        const excludedPackages = ['eslint-config', 'typescript-config', 'shadcn-ui'];

        for (const pkg of packages) {
            const packagePath = join(packagesDir, pkg);
            const stats = await stat(packagePath);

            if (!stats.isDirectory() || excludedPackages.includes(pkg)) {
                continue;
            }

            console.log(`📦 Processing package: ${pkg}`);
            const items = await scanPackageDirectory(packagePath, pkg);
            allItems.push(...items);
        }

        // Sort items alphabetically by name
        allItems.sort((a, b) => a.name.localeCompare(b.name));

        // Create the registry object
        const registry: Registry = {
            $schema: 'https://ui.shadcn.com/schema/registry.json',
            name: 'dedevs-ui',
            homepage: 'https://ui.dedevs.com',
            items: allItems
        };

        // Write the registry file
        await writeFile(registryPath, JSON.stringify(registry, null, 2), 'utf-8');

        console.log('✅ Registry generated successfully!');
        console.log(`📄 Generated ${allItems.length} component(s):`);
        allItems.forEach(item => {
            console.log(`   - ${item.name}: ${item.description}`);
        });
        console.log(`💾 Registry saved to: ${registryPath}`);

    } catch (error) {
        console.error('❌ Error generating registry:', error);
        process.exit(1);
    }
}

// Run the script if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    generateRegistry().catch(console.error);
}

export { generateRegistry };
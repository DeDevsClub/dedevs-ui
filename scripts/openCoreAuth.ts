#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';

interface AuthConfig {
    apiKey?: string;
    tier: 'free' | 'pro';
    lastVerified?: string;
}

interface ComponentSource {
    name: string;
    url: string;
    requiresAuth: boolean;
    tier: 'free' | 'pro';
}

// Component sources - open source approach
const COMPONENT_SOURCES: ComponentSource[] = [
    {
        name: 'dedevs-ui-core',
        url: 'https://registry.ui.dedevs.com',
        requiresAuth: false,
        tier: 'free'
    },
    {
        name: 'dedevs-ui-pro',
        url: 'https://registry.pro.dedevs.com',
        requiresAuth: true,
        tier: 'pro'
    }
];

const CONFIG_DIR = join(homedir(), '.dedevs-ui');
const CONFIG_FILE = join(CONFIG_DIR, 'config.json');

export function getAuthConfig(): AuthConfig {
    if (!existsSync(CONFIG_FILE)) {
        return { tier: 'free' };
    }

    try {
        const config = JSON.parse(readFileSync(CONFIG_FILE, 'utf-8'));
        return { tier: 'free', ...config };
    } catch {
        return { tier: 'free' };
    }
}

export function saveAuthConfig(config: AuthConfig): void {
    if (!existsSync(CONFIG_DIR)) {
        mkdirSync(CONFIG_DIR, { recursive: true });
    }

    writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
}

export async function verifyApiKey(apiKey: string): Promise<{ valid: boolean; tier: 'free' | 'pro'; error?: string }> {
    try {
        // This endpoint validates the API key but doesn't expose pro components
        const response = await fetch('https://api.dedevs.com/v1/auth/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        });

        if (!response.ok) {
            return { valid: false, tier: 'free', error: 'Invalid API key' };
        }

        const data = await response.json();
        return { valid: true, tier: data.tier || 'pro' };
    } catch (error) {
        return { valid: false, tier: 'free', error: 'Failed to verify API key' };
    }
}

export function getAvailableSources(authConfig: AuthConfig): ComponentSource[] {
    if (authConfig.tier === 'pro' && authConfig.apiKey) {
        return COMPONENT_SOURCES; // All sources
    }
    return COMPONENT_SOURCES.filter(source => !source.requiresAuth); // Only free sources
}

export async function fetchComponentFromSources(
    componentName: string,
    authConfig: AuthConfig
): Promise<{ data: any; source: string } | null> {
    const sources = getAvailableSources(authConfig);

    for (const source of sources) {
        try {
            const url = `${source.url}/r/${componentName}.json`;
            const headers: Record<string, string> = {};

            if (source.requiresAuth && authConfig.apiKey) {
                headers['Authorization'] = `Bearer ${authConfig.apiKey}`;
            }

            const response = await fetch(url, { headers });

            if (response.ok) {
                const data = await response.json();
                return { data, source: source.name };
            }
        } catch (error) {
            // Continue to next source
            continue;
        }
    }

    return null;
}

export function requireProAccess(componentName: string): boolean {
    const config = getAuthConfig();

    // Check if component is available in free sources
    const freeSources = COMPONENT_SOURCES.filter(s => !s.requiresAuth);

    if (config.tier !== 'pro' || !config.apiKey) {
        console.log(`🔒 Component "${componentName}" requires DeDevs UI Pro.`);
        console.log('');
        console.log('🌟 Pro features include:');
        console.log('  • Advanced AI components with multi-model support');
        console.log('  • Premium dashboard and analytics components');
        console.log('  • Priority support and updates');
        console.log('  • Commercial usage rights');
        console.log('');
        console.log('To upgrade:');
        console.log('1. Visit https://ui.dedevs.com/pro');
        console.log('2. Get your API key');
        console.log('3. Run: npx dedevs-ui auth login <your-api-key>');
        console.log('');
        return false;
    }

    return true;
}

export async function loginCommand(apiKey: string): Promise<void> {
    console.log('🔐 Verifying API key...');

    const verification = await verifyApiKey(apiKey);

    if (!verification.valid) {
        console.error('❌ Invalid API key:', verification.error);
        process.exit(1);
    }

    const config: AuthConfig = {
        apiKey,
        tier: verification.tier,
        lastVerified: new Date().toISOString()
    };

    saveAuthConfig(config);

    console.log(`✅ Successfully authenticated as ${verification.tier} user`);
    console.log('🎉 You now have access to pro components and features!');

    if (verification.tier === 'pro') {
        console.log('');
        console.log('🚀 Pro components now available:');
        console.log('  • ai-advanced-chat - Multi-model chat interface');
        console.log('  • ai-code-review - AI-powered code review');
        console.log('  • premium-dashboard - Advanced analytics dashboard');
        console.log('  • And many more...');
    }
}

export function logoutCommand(): void {
    const config: AuthConfig = { tier: 'free' };
    saveAuthConfig(config);
    console.log('👋 Logged out successfully');
    console.log('💡 You can still use all free components');
}

export function statusCommand(): void {
    const config = getAuthConfig();
    const sources = getAvailableSources(config);

    console.log('DeDevs UI Status:');
    console.log(`📦 Tier: ${config.tier}`);
    console.log(`🔗 Available sources: ${sources.length}`);

    sources.forEach(source => {
        const icon = source.requiresAuth ? '🔒' : '🌐';
        console.log(`   ${icon} ${source.name} (${source.tier})`);
    });

    if (config.tier === 'pro') {
        console.log(`🔑 API Key: ${config.apiKey?.substring(0, 8)}...`);
        console.log(`⏰ Last Verified: ${config.lastVerified}`);
    } else {
        console.log('💡 Upgrade to Pro: https://ui.dedevs.com/pro');
    }
}

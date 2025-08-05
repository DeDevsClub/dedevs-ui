#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';

interface AuthConfig {
    apiKey?: string;
    tier: 'free' | 'pro';
    lastVerified?: string;
}

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

export function requireProAccess(): boolean {
    const config = getAuthConfig();

    if (config.tier !== 'pro' || !config.apiKey) {
        console.log('🔒 This feature requires DeDevs UI Pro.');
        console.log('');
        console.log('To upgrade:');
        console.log('1. Get your API key at https://ui.dedevs.com/pro');
        console.log('2. Run: npx dedevs-ui auth login <your-api-key>');
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
}

export function logoutCommand(): void {
    const config: AuthConfig = { tier: 'free' };
    saveAuthConfig(config);
    console.log('👋 Logged out successfully');
}

export function statusCommand(): void {
    const config = getAuthConfig();

    console.log('DeDevs UI Authentication Status:');
    console.log(`Tier: ${config.tier}`);

    if (config.tier === 'pro') {
        console.log(`API Key: ${config.apiKey?.substring(0, 8)}...`);
        console.log(`Last Verified: ${config.lastVerified}`);
    } else {
        console.log('Status: Free tier');
        console.log('Upgrade at: https://ui.dedevs.com/pro');
    }
}

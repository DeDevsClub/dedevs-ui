#!/usr/bin/env ts-node

import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';

// Upstash Redis HTTP client (edge-friendly)
class UpstashRedis {
    private baseUrl: string;
    private token: string;

    constructor() {
        this.baseUrl = process.env.KV_REST_API_URL!;
        this.token = process.env.KV_REST_API_TOKEN!;

        if (!this.baseUrl || !this.token) {
            throw new Error('KV_REST_API_URL and KV_REST_API_TOKEN environment variables are required');
        }
    }

    private async request(command: string[]): Promise<any> {
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(command),
        });

        if (!response.ok) {
            throw new Error(`Upstash request failed: ${response.statusText}`);
        }

        const data = await response.json();
        return data.result;
    }

    async get(key: string): Promise<string | null> {
        return await this.request(['GET', key]);
    }

    async incr(key: string): Promise<number> {
        return await this.request(['INCR', key]);
    }

    async lpush(key: string, value: string): Promise<void> {
        await this.request(['LPUSH', key, value]);
    }

    async ltrim(key: string, start: number, stop: number): Promise<void> {
        await this.request(['LTRIM', key, start.toString(), stop.toString()]);
    }

    async expire(key: string, seconds: number): Promise<void> {
        await this.request(['EXPIRE', key, seconds.toString()]);
    }

    async pipeline(commands: string[][]): Promise<any[]> {
        const response = await fetch(`${this.baseUrl}/pipeline`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commands),
        });

        if (!response.ok) {
            throw new Error(`Upstash pipeline request failed: ${response.statusText}`);
        }

        const data = await response.json();
        return data.map((item: any) => item.result);
    }
}

const app = express();
const redis = new UpstashRedis();

// Middleware
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? ['https://ui.dedevs.com', 'https://dedevs.com']
        : true
}));

app.use(express.json());

// Rate limiting with Upstash
const createRateLimit = (windowMs: number, max: number, keyPrefix: string) => {
    return rateLimit({
        windowMs,
        max,
        keyGenerator: (req) => {
            const ip = req.ip || req.connection.remoteAddress || 'unknown';
            return `${keyPrefix}:${ip}`;
        },
        store: {
            incr: async (key: string) => {
                try {
                    const current = await redis.incr(`ratelimit:${key}`);
                    if (current === 1) {
                        await redis.expire(`ratelimit:${key}`, Math.ceil(windowMs / 1000));
                    }
                    return { totalHits: current, resetTime: new Date(Date.now() + windowMs) };
                } catch (error) {
                    console.error('Rate limit store error:', error);
                    return { totalHits: 1, resetTime: new Date(Date.now() + windowMs) };
                }
            },
            decrement: async () => { }, // Not implemented for simplicity
            resetKey: async () => { }, // Not implemented for simplicity
        },
        standardHeaders: true,
        legacyHeaders: false,
    });
};

// Different rate limits for different tiers
const freeUserLimit = createRateLimit(15 * 60 * 1000, 100, 'free'); // 100 requests per 15 minutes
const proUserLimit = createRateLimit(15 * 60 * 1000, 1000, 'pro'); // 1000 requests per 15 minutes

// Authentication middleware
async function authenticateUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    const apiKey = req.headers.authorization?.replace('Bearer ', '');

    if (!apiKey) {
        req.userTier = 'free';
        return next();
    }

    try {
        // Verify API key with your auth service
        const response = await fetch(`${process.env.AUTH_SERVICE_URL || 'https://api.dedevs.com'}/v1/auth/verify`, {
            headers: { 'Authorization': `Bearer ${apiKey}` }
        });

        if (response.ok) {
            const userData = await response.json();
            req.userTier = userData.tier || 'pro';
            req.userId = userData.userId;
        } else {
            req.userTier = 'free';
        }
    } catch (error) {
        console.error('Auth verification failed:', error);
        req.userTier = 'free';
    }

    next();
}

// Apply rate limiting based on user tier
function applyRateLimit(req: express.Request, res: express.Response, next: express.NextFunction) {
    const limit = req.userTier === 'pro' ? proUserLimit : freeUserLimit;
    limit(req, res, next);
}

// Extend Express Request type
declare global {
    namespace Express {
        interface Request {
            userTier?: 'free' | 'pro';
            userId?: string;
        }
    }
}

// Analytics logging
async function logRequest(req: express.Request, componentName?: string) {
    try {
        const logData = {
            timestamp: new Date().toISOString(),
            ip: req.ip,
            userAgent: req.headers['user-agent'],
            tier: req.userTier,
            userId: req.userId,
            component: componentName,
            endpoint: req.path
        };

        // Store in Redis with expiration (30 days)
        await redis.lpush('dedevs:analytics:requests', JSON.stringify(logData));
        await redis.ltrim('dedevs:analytics:requests', 0, 9999); // Keep last 10k requests
        await redis.expire('dedevs:analytics:requests', 30 * 24 * 60 * 60);

        // Increment counters
        const today = new Date().toISOString().split('T')[0];
        await redis.incr(`dedevs:analytics:daily:${today}`);
        await redis.expire(`dedevs:analytics:daily:${today}`, 7 * 24 * 60 * 60); // Keep for 7 days

        if (componentName) {
            await redis.incr(`dedevs:analytics:component:${componentName}`);
        }
    } catch (error) {
        console.error('Analytics logging failed:', error);
    }
}

// Routes

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Get registry (free or complete based on user tier)
app.get('/registry', authenticateUser, applyRateLimit, async (req, res) => {
    try {
        await logRequest(req);

        const registryKey = req.userTier === 'pro' ? 'dedevs:registry:complete' : 'dedevs:registry:free';
        const registryData = await redis.get(registryKey);

        if (!registryData) {
            return res.status(404).json({
                error: 'Registry not found',
                fallback: 'https://raw.githubusercontent.com/DeDevsClub/dedevs-ui/main/registry.json'
            });
        }

        const registry = JSON.parse(registryData);

        res.set({
            'Cache-Control': 'public, max-age=300', // 5 minutes
            'Content-Type': 'application/json'
        });

        res.json(registry);
    } catch (error) {
        console.error('Registry fetch error:', error);
        res.status(500).json({
            error: 'Internal server error',
            fallback: 'https://raw.githubusercontent.com/DeDevsClub/dedevs-ui/main/registry.json'
        });
    }
});

// Get specific component
app.get('/components/:name', authenticateUser, applyRateLimit, async (req, res) => {
    try {
        const { name } = req.params;
        await logRequest(req, name);

        const componentData = await redis.get(`dedevs:component:${name}`);

        if (!componentData) {
            return res.status(404).json({
                error: 'Component not found',
                component: name
            });
        }

        const component = JSON.parse(componentData);

        // Check access permissions
        if (component.tier === 'pro' && req.userTier === 'free') {
            return res.status(403).json({
                error: 'Pro component requires authentication',
                component: name,
                tier: 'pro',
                upgrade: 'https://dedevs.com/pricing'
            });
        }

        res.set({
            'Cache-Control': 'public, max-age=300', // 5 minutes
            'Content-Type': 'application/json'
        });

        res.json(component);
    } catch (error) {
        console.error('Component fetch error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// List components by tier
app.get('/components', authenticateUser, applyRateLimit, async (req, res) => {
    try {
        await logRequest(req);

        const tier = req.query.tier as string;
        const validTiers = ['free', 'pro'];

        if (tier && !validTiers.includes(tier)) {
            return res.status(400).json({ error: 'Invalid tier. Must be "free" or "pro"' });
        }

        // Determine which components to return
        let componentListKey = 'dedevs:components:free';

        if (tier === 'pro' && req.userTier === 'pro') {
            componentListKey = 'dedevs:components:pro';
        } else if (tier === 'pro' && req.userTier === 'free') {
            return res.status(403).json({
                error: 'Pro components require authentication',
                upgrade: 'https://dedevs.com/pricing'
            });
        }

        const componentListData = await redis.get(componentListKey);

        if (!componentListData) {
            return res.status(404).json({ error: 'Component list not found' });
        }

        const componentNames = JSON.parse(componentListData);

        // Get metadata for each component
        const metadataPromises = componentNames.map(async (name: string) => {
            const metaData = await redis.get(`dedevs:component:meta:${name}`);
            return metaData ? JSON.parse(metaData) : null;
        });

        const metadata = await Promise.all(metadataPromises);
        const validMetadata = metadata.filter(Boolean);

        res.set({
            'Cache-Control': 'public, max-age=300',
            'Content-Type': 'application/json'
        });

        res.json({
            tier: tier || 'free',
            count: validMetadata.length,
            components: validMetadata
        });
    } catch (error) {
        console.error('Component list error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Analytics endpoint (pro users only)
app.get('/analytics', authenticateUser, applyRateLimit, async (req, res) => {
    if (req.userTier !== 'pro') {
        return res.status(403).json({
            error: 'Analytics require pro subscription',
            upgrade: 'https://dedevs.com/pricing'
        });
    }

    try {
        // Get daily stats for last 7 days
        const today = new Date();
        const dailyStats = [];

        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];

            const count = await redis.get(`dedevs:analytics:daily:${dateStr}`);
            dailyStats.push({
                date: dateStr,
                requests: parseInt(count || '0')
            });
        }

        res.json({
            dailyStats,
            period: '7 days'
        });
    } catch (error) {
        console.error('Analytics error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Admin sync endpoint (for CI/CD)
app.post('/admin/sync', async (req, res) => {
    const adminKey = req.headers.authorization?.replace('Bearer ', '');

    if (adminKey !== process.env.ADMIN_API_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        // Trigger registry regeneration
        const { generateUpstashRegistry } = await import('../scripts/generateUpstashRegistry.js');
        await generateUpstashRegistry();

        res.json({
            success: true,
            message: 'Registry synced successfully',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Sync error:', error);
        res.status(500).json({ error: 'Sync failed' });
    }
});

// Error handling
app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Unhandled error:', error);
    res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`🚀 Upstash Registry API running on port ${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 Upstash URL: ${process.env.KV_REST_API_URL ? 'Connected' : 'Not configured'}`);
});

export default app;

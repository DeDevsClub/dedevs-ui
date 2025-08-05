import { vercel } from '@t3-oss/env-core/presets-zod';
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  extends: [vercel()],
  server: {
    ANALYZE: z.string().optional(),
    BETTERSTACK_API_KEY: z.string().min(1).optional(),
    BETTERSTACK_URL: z.string().min(1).url().optional(),

    // Database
    DATABASE_URL: z.string().min(1),

    // Polar API for subscription management
    POLAR_ACCESS_TOKEN: z.string().min(1),

    // GitHub API
    GITHUB_TOKEN: z.string().min(1).optional(),

    // Base URL for the application
    BASE_URL: z.string().min(1).url(),

    // OAuth providers (currently commented out in auth config)
    GOOGLE_CLIENT_ID: z.string().min(1).optional(),
    GOOGLE_CLIENT_SECRET: z.string().min(1).optional(),
    GITHUB_CLIENT_ID: z.string().min(1).optional(),
    GITHUB_CLIENT_SECRET: z.string().min(1).optional(),

    // Added by Vercel
    NEXT_RUNTIME: z.enum(['nodejs', 'edge']).optional(),

    // Added by Sentry Integration, Vercel Marketplace
    SENTRY_ORG: z.string().min(1).optional(),
    SENTRY_PROJECT: z.string().min(1).optional(),
  },
  client: {
    NEXT_PUBLIC_GA_MEASUREMENT_ID: z
      .string()
      .min(1)
      .startsWith('G-')
      .optional(),
    NEXT_PUBLIC_LOGO_DEV_TOKEN: z.string().min(1).optional(),
    NEXT_PUBLIC_PRO_PRODUCT_ID: z.string().min(1).optional(),
    NEXT_PUBLIC_SOURCE_URL: z.string().min(1).url().optional(),

    // Added by Sentry Integration, Vercel Marketplace
    NEXT_PUBLIC_SENTRY_DSN: z.string().min(1).url().optional(),
  },
  runtimeEnv: {
    ANALYZE: process.env.ANALYZE,
    NEXT_RUNTIME: process.env.NEXT_RUNTIME,
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    BETTERSTACK_API_KEY: process.env.BETTERSTACK_API_KEY,
    BETTERSTACK_URL: process.env.BETTERSTACK_URL,
    SENTRY_ORG: process.env.SENTRY_ORG,
    SENTRY_PROJECT: process.env.SENTRY_PROJECT,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    NEXT_PUBLIC_LOGO_DEV_TOKEN: process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN,
    NEXT_PUBLIC_PRO_PRODUCT_ID: process.env.NEXT_PUBLIC_PRO_PRODUCT_ID,
    NEXT_PUBLIC_SOURCE_URL: process.env.NEXT_PUBLIC_SOURCE_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    POLAR_ACCESS_TOKEN: process.env.POLAR_ACCESS_TOKEN,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    BASE_URL: process.env.BASE_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET
  }
});

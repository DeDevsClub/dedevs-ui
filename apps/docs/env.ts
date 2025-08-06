import { vercel } from '@t3-oss/env-core/presets-zod';
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  extends: [vercel()],
  server: {
    ANALYZE: z.string().optional(),
    BETTERSTACK_API_KEY: z.string().optional(),
    BETTERSTACK_URL: z.string().optional().refine((val) => !val || z.string().url().safeParse(val).success, {
      message: "Invalid URL"
    }),

    // Database
    DATABASE_URL: z.string().optional(),

    // Polar API for subscription management
    POLAR_ACCESS_TOKEN: z.string().optional(),

    // GitHub API
    GITHUB_TOKEN: z.string().optional(),

    // Base URL for the application
    BASE_URL: z.string().optional().refine((val) => !val || z.string().url().safeParse(val).success, {
      message: "Invalid URL"
    }),

    // OAuth providers (currently commented out in auth config)
    GOOGLE_CLIENT_ID: z.string().optional(),
    GOOGLE_CLIENT_SECRET: z.string().optional(),
    GITHUB_CLIENT_ID: z.string().optional(),
    GITHUB_CLIENT_SECRET: z.string().optional(),

    // Added by Vercel
    NEXT_RUNTIME: z.enum(['nodejs', 'edge']).optional(),

    // Added by Sentry Integration, Vercel Marketplace
    SENTRY_ORG: z.string().optional(),
    SENTRY_PROJECT: z.string().optional(),

    // SEO Verification Codes
    // GOOGLE_SITE_VERIFICATION: z.string().optional(),
    // BING_VERIFICATION: z.string().optional(),
    // YANDEX_VERIFICATION: z.string().optional(),
    // YAHOO_VERIFICATION: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_GA_MEASUREMENT_ID: z
      .string()
      .optional()
      .refine((val) => !val || val.startsWith('G-'), {
        message: "Must start with 'G-'"
      }),
    NEXT_PUBLIC_LOGO_DEV_TOKEN: z.string().optional(),
    NEXT_PUBLIC_PRO_PRODUCT_ID: z.string().optional(),
    NEXT_PUBLIC_SOURCE_URL: z.string().optional().refine((val) => !val || z.string().url().safeParse(val).success, {
      message: "Invalid URL"
    }),

    // Added by Sentry Integration, Vercel Marketplace
    NEXT_PUBLIC_SENTRY_DSN: z.string().optional().refine((val) => !val || z.string().url().safeParse(val).success, {
      message: "Invalid URL"
    }),

    // Base URL for SEO and metadata
    NEXT_PUBLIC_BASE_URL: z.string().optional().refine((val) => !val || z.string().url().safeParse(val).success, {
      message: "Invalid URL"
    }),
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
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    // GOOGLE_SITE_VERIFICATION: process.env.GOOGLE_SITE_VERIFICATION,
    // BING_VERIFICATION: process.env.BING_VERIFICATION,
    // YANDEX_VERIFICATION: process.env.YANDEX_VERIFICATION,
    // YAHOO_VERIFICATION: process.env.YAHOO_VERIFICATION,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL
  }
});

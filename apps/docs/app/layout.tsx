import type * as React from 'react';

import './globals.css';
// import { GoogleAnalytics } from '@next/third-parties/google';
import { Toaster } from '@repo/shadcn-ui/components/ui/sonner';
import { TooltipProvider } from '@repo/shadcn-ui/components/ui/tooltip';
import { cn } from '@repo/shadcn-ui/lib/utils';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import { RootProvider } from 'fumadocs-ui/provider';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/providers/theme';
import { mono, sans } from '../lib/fonts';

const sourceUrl =
  process.env.NEXT_PUBLIC_SOURCE_URL || 'https://devcdn-ui.dedevs.com';

export const metadata: Metadata = {
  title: 'DeDevs UI',
  description:
    'DeDevs UI is a custom registry of composable, accessible and extensible components designed for use with shadcn/ui.',
  openGraph: {
    title: 'DeDevs UI',
    description:
      'DeDevs UI is a custom registry of composable, accessible and extensible components designed for use with shadcn/ui.',
    type: 'website',
    images: [
      {
        url: `${sourceUrl}/opengraph-image.png`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

type LayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<LayoutProps>) {
  return (
    <html
      className={cn(
        'touch-manipulation font-sans antialiased',
        sans.variable,
        mono.variable
      )}
      lang="en"
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col">
        <ThemeProvider>
          <RootProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </RootProvider>
          <VercelAnalytics />
          {/* {env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )} */}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}

import type * as React from 'react';

import './globals.css';
// import { GoogleAnalytics } from '@next/third-parties/google';
import { Toaster } from '@repo/shadcn-ui/components/ui/sonner';
import { TooltipProvider } from '@repo/shadcn-ui/components/ui/tooltip';
import { cn } from '@repo/shadcn-ui/lib/utils';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import { RootProvider } from 'fumadocs-ui/provider';
import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from '@/providers/theme';
import { mono, sans } from '../lib/fonts';
import { defaultMetadata } from '@/lib/metadata';
import { OrganizationStructuredData, WebsiteStructuredData, SoftwareApplicationStructuredData } from '../components/structured-data';

export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
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
        <OrganizationStructuredData />
        <WebsiteStructuredData />
        <SoftwareApplicationStructuredData />
        <Toaster />
      </body>
    </html>
  );
}

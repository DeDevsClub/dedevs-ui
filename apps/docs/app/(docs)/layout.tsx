import { DocsLayout as FumaDocsLayout } from 'fumadocs-ui/layouts/notebook';
import type { ReactNode } from 'react';
import { ConditionalContainer } from '../../components/conditional-container';
import { baseOptions } from '../../lib/layout.config';
import { source } from '../../lib/source';
import type * as React from 'react';
import { ProAuthProvider } from '@/lib/pro-auth';
import { ProBanner } from '@/components/pro-banner';

export default function DocsRootLayout({ children }: { children: ReactNode }) {
  return (
    <ProAuthProvider>
      <div className="flex min-h-screen flex-col">
        <ProBanner />
        <div className="flex flex-1">
          <ConditionalContainer>
            <FumaDocsLayout
              {...baseOptions}
              nav={{
                ...baseOptions.nav,
                mode: 'auto',
              }}
              sidebar={{
                collapsible: true,
                tabs: [
                  {
                    title: 'Docs',
                    url: '/docs',
                  },
                  {
                    title: 'Components',
                    url: '/components',
                  },
                  {
                    title: 'Blocks',
                    url: '/blocks',
                  },
                ],
              }}
              tree={source.pageTree}
            >
              {children}
            </FumaDocsLayout>
          </ConditionalContainer>
        </div>
      </div>
    </ProAuthProvider>
  );
}

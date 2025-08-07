import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';

export const baseOptions: BaseLayoutProps = {
  links: [
    {
      text: 'Docs',
      url: '/docs',
      active: 'nested-url',
    },
    {
      text: 'Components',
      url: '/components',
      active: 'nested-url',
    },
    {
      text: 'Blocks',
      url: '/blocks',
      active: 'nested-url',
    },
  ],
  githubUrl: 'https://github.com/DeDevsClub/dedevs-ui',
  nav: {
    title: (
      <div className="flex items-center gap-2 rounded-md border border-border p-2 hover:bg-muted/60">
        <Image
          alt="DeDevs UI Design Registry"
          height={28}
          src="/logo.svg"
          width={28}
        />
      </div>
    ),
  },
};

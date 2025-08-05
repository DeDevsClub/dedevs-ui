import { Icon, type IconProps } from '@iconify/react';
import { cn } from '@repo/shadcn-ui/lib/utils';

type PoweredByProps = {
  packages: { name: string; url: string; icon: string }[];
};

// const getHostname = (url: string) => {
//   if (url.startsWith('/')) {
//     return new URL(url, 'https://ui.dedevs.com').hostname.replace('www.', '');
//   }

//   const parsedUrl = new URL(url);

//   return parsedUrl.hostname.replace('www.', '');
// };

export const PoweredBy = ({ packages }: PoweredByProps) => (
  <div className="not-prose mb-8 flex flex-col gap-2">
    <p className="text-sm text-text dark:text-text">Powered by</p>
    <div className="flex flex-row flex-wrap items-center gap-2">
      {packages.map(({ name, url, icon }) => (
        <a
          className={cn(
            'flex items-center gap-1.5 rounded-full bg-primary/20 px-3 py-1 transition-all',
            'hover:bg-primary/80'
          )}
          href={url}
          key={name}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Icon
            className="size-6 overflow-hidden rounded-sm object-cover"
            icon={
              icon as IconProps['icon'] | 'material-symbols:code-blocks-rounded'
            }
          />
          <p className="text-base text-primary">{name}</p>
        </a>
      ))}
    </div>
  </div>
);

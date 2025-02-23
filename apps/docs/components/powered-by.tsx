import { env } from '@/env';
import { cn } from '@repo/shadcn-ui/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
type PoweredByProps = {
  packages: { name: string; url: string }[];
};

export const PoweredBy = ({ packages }: PoweredByProps) => (
  <div className="not-prose mb-8 flex flex-col gap-2">
    <p className="text-muted-foreground text-sm">Powered by</p>
    <div className="flex flex-row flex-wrap items-center gap-2">
      {packages.map(({ name, url }) => (
        <Link
          href={url}
          key={name}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 transition-all',
            'hover:bg-secondary/80'
          )}
        >
          <Image
            src={`https://img.logo.dev/${new URL(url).hostname}`}
            alt={name}
            width={14}
            height={14}
            className="h-3.5 w-3.5 overflow-hidden rounded-sm object-cover"
          />
          <p className="text-muted-foreground text-sm">{name}</p>
        </Link>
      ))}
    </div>
  </div>
);

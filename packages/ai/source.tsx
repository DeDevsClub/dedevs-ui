'use client';

import { BookIcon, ChevronDownIcon } from 'lucide-react';
import type { ComponentProps } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@repo/shadcn-ui/components/ui/collapsible';
import { cn } from '@repo/shadcn-ui/lib/utils';

export type AISourcesProps = ComponentProps<'div'>;

export const AISources = ({ className, ...props }: AISourcesProps) => (
  <Collapsible
    className={cn('flex flex-col not-prose mb-4 text-primary justify-center items-center text-center text-sm w-full', 
      'bg-muted text-muted-foreground hover:bg-muted/80 transition-colors rounded-md p-1',
      className)}
    {...props}
  />
);

export type AISourcesTriggerProps = ComponentProps<
  typeof CollapsibleTrigger
> & {
  count: number;
};

export const AISourcesTrigger = ({
  className,
  count,
  children,
  ...props
}: AISourcesTriggerProps) => (
  <CollapsibleTrigger className="flex items-center gap-2 w-full justify-center" {...props}>
    {children ?? (
      <>
        <p className="font-medium">Used {count} sources</p>
        <ChevronDownIcon className="h-4 w-4" />
      </>
    )}
  </CollapsibleTrigger>
);

export type AISourcesContentProps = ComponentProps<typeof CollapsibleContent>;

export const AISourcesContent = ({
  className,
  ...props
}: AISourcesContentProps) => (
  <CollapsibleContent
    className={cn('mt-3 flex flex-col gap-2', className)}
    {...props}
  />
);

export type AISourceProps = ComponentProps<'a'>;

export const AISource = ({
  href,
  title,
  children,
  ...props
}: AISourceProps) => (
  <a
    className="flex items-center gap-2 hover:bg-muted hover:text-primary rounded-md p-2 transition-colors"
    href={href}
    rel="noreferrer"
    target="_blank"
    {...props}
  >
    {children ?? (
      <>
        <BookIcon className="h-4 w-4" />
        <span className="block font-medium">{title}</span>
      </>
    )}
  </a>
);

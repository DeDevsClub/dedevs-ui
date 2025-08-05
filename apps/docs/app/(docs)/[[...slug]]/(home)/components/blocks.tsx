import { Button } from '@repo/shadcn-ui/components/ui/button';
import { cn } from '@repo/shadcn-ui/lib/utils';
import type { LucideProps } from 'lucide-react';
import { ArrowRightIcon, icons } from 'lucide-react';
import Link from 'next/link';
import type { ComponentType } from 'react';
import { createElement } from 'react';
import AIInputExample from '../../../../../examples/ai-chatbot';
import { source } from '../../../../../lib/source';

const aiChatbot = source.getPage(['blocks', 'ai-chatbot']);

const examples = [
  {
    icon: aiChatbot?.data.icon,
    name: aiChatbot?.data.title,
    description: aiChatbot?.data.description,
    component: () => (
      <div className="aspect-square overflow-hidden">
        <AIInputExample />
      </div>
    ),
  },
];

const ExampleCard = ({
  icon,
  name,
  description,
  component: Component,
  className,
}: {
  icon: string | undefined;
  name: string | undefined;
  description: string | undefined;
  component: ComponentType;
  className?: string;
}) => {
  const Icon =
    icon && icon in icons
      ? (props: LucideProps) =>
        createElement(icons[icon as keyof typeof icons], {
          ...props,
        })
      : null;

  return (
    <div
      className={cn(
        'flex h-full flex-col gap-2 rounded-lg bg-secondary p-4 sm:p-8',
        className
      )}
      key={name}
    >
      <div className="grid gap-2">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="text-muted-foreground" size={16} />}
          {name && <p className="font-medium">{name}</p>}
        </div>
        {description && (
          <p className="text-balance text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="overflow-hidden rounded-lg border bg-background text-left">
        <Component />
      </div>
    </div>
  );
};

export const Blocks = () => (
  <div className="container mx-auto">
    <div className="flex w-full flex-col items-start justify-between gap-2 py-16 md:flex-row">
      <div className="grid gap-2">
        <h2 className="max-w-full font-semibold text-3xl">
          Building blocks for interfaces
        </h2>
        <p className="max-w-full text-balance text-lg text-muted-foreground">
          Get your apps and websites up and running quickly with precomposed and
          animated blocks.
        </p>
      </div>
      <Button asChild size="lg">
        <Link href="/blocks">
          <span>Explore blocks</span>
          <ArrowRightIcon size={16} />
        </Link>
      </Button>
    </div>
    <div className="grid w-full grid-cols-1 gap-4 py-4">
      {examples.map((example) => (
        <ExampleCard key={example.name} {...example} />
      ))}
    </div>
  </div>
);
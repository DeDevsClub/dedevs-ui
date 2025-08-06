import { Button } from '@repo/shadcn-ui/components/ui/button';
import { cn } from '@repo/shadcn-ui/lib/utils';
import { ArrowRightIcon, icons, type LucideProps } from 'lucide-react';
import Link from 'next/link';
import { type ComponentType, createElement } from 'react';
// import AiResponseExample from '../../../../../examples/ai-message-markdown'; // Disabled
import { source } from '../../../../../lib/source';
import { CodeBlockExample } from './code-block-example';
import AiResponseExample from '@/examples/ai-response';

const codeBlock = source.getPage(['components', 'code-block']);
const aiResponse = source.getPage(['components', 'ai-response']);

const examples = [
  {
    icon: codeBlock?.data.icon,
    name: codeBlock?.data.title,
    description: codeBlock?.data.description,
    component: () => <CodeBlockExample />,
  },
  {
    icon: aiResponse?.data.icon,
    name: aiResponse?.data.title,
    description: aiResponse?.data.description,
    component: () => <AiResponseExample />,
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
        'flex h-full flex-col gap-8 rounded-lg bg-secondary p-4 sm:p-8',
        className
      )}
      key={name}
    >
      <div className="grid gap-4">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="text-muted-foreground" size={16} />}
          {name && <p className="font-medium">{name}</p>}
        </div>
        {description && (
          <p className="text-balance text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="text-left">
        <Component />
      </div>
    </div>
  );
};

export const Components = () => (
  <div className="container mx-auto">
    <div className="flex w-full flex-col items-start justify-between gap-4 py-12 md:flex-row">
      <div className="grid gap-4">
        <h2 className="max-w-lg font-semibold text-3xl">
          Functional and fully composable
        </h2>
        <p className="max-w-lg text-balance text-lg text-muted-foreground">
          DeDevs UI components are designed to be fully composable so you can
          build, customize and extend them to your own needs.
        </p>
      </div>
      <Button asChild size="lg">
        <Link href="/components">
          <span>Explore components</span>
          <ArrowRightIcon size={16} />
        </Link>
      </Button>
    </div>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {examples.map((example) => (
        <ExampleCard key={example.name} {...example} />
      ))}
    </div>
  </div>
);

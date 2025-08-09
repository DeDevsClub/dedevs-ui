import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@repo/shadcn-ui/components/ui/resizable';
import { cn } from '@repo/shadcn-ui/lib/utils';
import type { ReactNode } from 'react';

type PreviewContentProps = {
  children: ReactNode;
  type: 'component' | 'block';
};

export const PreviewContent = ({ children, type }: PreviewContentProps) => {
  return (
    <ResizablePanelGroup className="size-full" direction="horizontal">
      <ResizablePanel
        className={cn(
          'peer not-fumadocs-codeblock size-full',
          // For components, allow scrolling so top content is not clipped
          type === 'component' ? 'overflow-auto' : 'overflow-auto'
        )}
        defaultSize={100}
        maxSize={100}
        minSize={40}
      >
        {children}
      </ResizablePanel>
      <ResizableHandle
        className="peer-data-[panel-size=100.0]:w-0"
        withHandle
      />
      <ResizablePanel
        className="border-none bg-background"
        defaultSize={0}
        maxSize={70}
        minSize={0}
      />
    </ResizablePanelGroup>
  );
};

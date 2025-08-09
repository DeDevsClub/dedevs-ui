import type { ReactNode } from 'react';

type PreviewRenderProps = {
  children: ReactNode;
};

export const PreviewRender = ({ children }: PreviewRenderProps) => {
  return (
    <div className="relative flex size-full flex-col items-stretch justify-start gap-4 overflow-auto p-4 [--primary-foreground:oklch(0.985_0_0)] [--primary:oklch(0.205_0_0)] dark:[--primary-foreground:oklch(0.205_0_0)] dark:[--primary:oklch(0.985_0_0)]">
      {/* subtle frame kept away from the edges so it doesn't cover content */}
      <div className="pointer-events-none absolute inset-x-4 top-6 h-px -translate-y-px border border-border/50 border-dashed" />
      <div className="pointer-events-none absolute inset-x-4 bottom-6 translate-y-px h-px border border-border/50 border-dashed" />
      <div className="pointer-events-none absolute inset-y-4 left-6 w-px -translate-x-px border border-border/50 border-dashed" />
      <div className="pointer-events-none absolute inset-y-4 right-6 translate-x-px w-px border border-border/50 border-dashed" />
      <div className="w-full">{children}</div>
    </div>
  );
};

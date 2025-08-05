'use client';

import { Button } from '@repo/shadcn-ui/components/ui/button';
import { Card } from '@repo/shadcn-ui/components/ui/card';

export interface SimpleAIProps {
  children?: React.ReactNode;
}

export function SimpleAI({ children }: SimpleAIProps) {
  return (
    <Card className="p-4">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">AI Component</h3>
        <p className="text-sm text-muted-foreground">
          This is a simple AI component for demonstration.
        </p>
        {children}
        <Button>AI Action</Button>
      </div>
    </Card>
  );
}

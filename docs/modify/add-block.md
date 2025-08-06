## Add New Block

### Overview

Blocks are pre-built component compositions that demonstrate common usage patterns. They're typically more complex than individual components and show real-world implementations.

### Step-by-Step Process

#### 1. Create Block Structure

Blocks follow the same package structure as components but are typically more comprehensive:

```bash
# Create in existing package or new block-specific package
cd packages/your-block-category/
```

#### 2. Create Block Component

Blocks should be self-contained and demonstrate practical usage:

```tsx
import React from 'react';
import { YourComponent } from './your-component';
import { Button } from '@repo/shadcn-ui/components/ui/button';
import { Card } from '@repo/shadcn-ui/components/ui/card';

interface YourBlockProps {
  // Block-specific props
}

export const YourBlock: React.FC<YourBlockProps> = (props) => {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <YourComponent {...props} />
        <div className="flex gap-2">
          <Button variant="default">Primary Action</Button>
          <Button variant="outline">Secondary Action</Button>
        </div>
      </div>
    </Card>
  );
};
```

#### 3. Update Registry Type

Blocks use the `registry:block` type in the registry. The generation script will automatically detect and categorize them appropriately.

#### 4. Add Documentation

Create comprehensive documentation for your block:

* Usage examples
* Props documentation
* Integration guidelines
* Customization options

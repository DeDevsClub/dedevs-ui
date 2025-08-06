## Adding a New Component

### Overview

Components in the DeDevs UI registry are organized in the `packages/` directory using a **package-based architecture**. Each package represents a category of related components (e.g., `@repo/ai`, `@repo/code`).

**IMPORTANT**: Components are **never created as standalone packages**. You must either:

1. **Add to an existing package** (recommended for related functionality)
2. **Create a new package** following the established patterns (only for new component categories)

### Current Package Structure

The registry follows these established package patterns:

* **`@repo/ai`** - AI interface components (input, response, conversation, reasoning, etc.)
* **`@repo/code`** - Code-related components (editor, snippet, block, etc.)
* **`@repo/shadcn-ui`** - Base UI components (internal)
* **`@repo/defi`** - DeFi components (ticker, etc.)

### Decision Tree: Where to Add Your Component

Before creating a component, determine the correct approach:

#### Option 1: Add to Existing Package (Recommended)

**Choose this if your component:**

* Relates to AI interfaces → Add to `@repo/ai`
* Relates to code display/editing → Add to `@repo/code`
* Relates to DeFi Applications → Add to `@repo/defi`
* Fits within any existing package's scope

#### Option 2: Create New Package

**Only choose this if your component:**

* Represents a completely new category (e.g., `@repo/blockchain`, `@repo/portfolio`)
* Has no logical fit within existing packages
* Will contain multiple related components (not just one)

### Step-by-Step Process

#### Option 1: Adding to Existing Package

This is the **preferred approach** for most components.

##### 1. Navigate to the Target Package

```bash
# For AI-related components
cd packages/ai/

# For code-related components
cd packages/code/

# For defi-related components
cd packages/defi/

# For other existing packages
cd packages/your-target-package/
```

##### 2. Create Your Component File

Create a new `.tsx` file with a descriptive name:

```tsx
// packages/ai/your-feature.tsx (for AI components)
// packages/code/your-feature.tsx (for code components)
// packages/defi/your-feature.tsx (for defi components)

import React from 'react';
import { cn } from '@repo/shadcn-ui/lib/utils';

interface YourFeatureProps {
  className?: string;
  // Add your component props here
}

export const YourFeature = React.forwardRef<
  HTMLDivElement,
  YourFeatureProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('your-feature-base-styles', className)}
      {...props}
    >
      {/* Your component content */}
    </div>
  );
});

YourFeature.displayName = 'YourFeature';

// Export any additional types
export type { YourFeatureProps };
```

##### 3. Update Package Index (if needed)

For packages with an `index.tsx` file (like `@repo/code`), add your export:

```tsx
// packages/code/index.tsx
export * from './your-feature';
```

##### 4. Update Component Descriptions

Edit `scripts/generateRegistry.ts` to add your component description:

```typescript
const COMPONENT_DESCRIPTIONS: Record<string, string> = {
  // ... existing descriptions
  'ai-your-feature': 'Description of your AI feature component', // for AI package
  'code-your-feature': 'Description of your code feature component', // for code package
  'defi-your-feature': 'Description of your defi feature component', // for defi package
  // Add more component descriptions as needed
};
```

#### Option 2: Creating a New Package

**Only use this approach for new component categories.**

##### 1. Create Package Directory Structure

```bash
# Navigate to packages directory
cd packages/

# Create new package directory with descriptive name
mkdir your-category  # e.g., blockchain, portfolio, analytics
cd your-category
```

##### 2. Set Up Package Configuration

Create `package.json` following the established pattern:

```json
{
  "name": "@repo/your-category",
  "description": "Brief description of your component category",
  "version": "0.0.0",
  "private": true,
  "dependencies": {
    "@repo/shadcn-ui": "workspace:*",
    "lucide-react": "^0.536.0",
    "react": "^19.1.1",
    "react-dom": "^19.1.1"
  },
  "devDependencies": {
    "@repo/typescript-config": "workspace:*",
    "@types/react": "^19.1.9",
    "@types/react-dom": "^19.1.7",
    "typescript": "^5.9.2"
  }
}
```

Create `tsconfig.json`:

```json
{
  "extends": "@repo/typescript-config/react-library.json",
  "compilerOptions": {
    "outDir": "dist"
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules", "dist"]
}
```

##### 3. Create Package Index

Create `index.tsx` to export all components:

```tsx
// packages/your-category/index.tsx
export * from './component-one';
export * from './component-two';
// Export all components in this package
```

##### 4. Create Your Components

Follow the same component creation pattern as Option 1.

##### 5. Update Registry Generation Logic

Update `scripts/generateRegistry.ts` to handle your new package:

```typescript
// Add to the scanning logic
else if (packageName === 'your-category') {
    for (const file of componentFiles) {
        const baseName = basename(file, extname(file));
        const componentName = `your-category-${baseName}`;
        // ... rest of the logic
    }
}

// Add descriptions
const COMPONENT_DESCRIPTIONS: Record<string, string> = {
  // ... existing descriptions
  'your-category-component': 'Description of your component',
};
```

### Registry Generation and Naming

The registry automatically generates component names based on package structure:

* **AI Package**: `ai-input`, `ai-response`, `ai-conversation`
* **Code Package**: `code-editor`, `code-snippet`, `code-block`
* **Defi Package**: `defi-ticker`, `defi-chart`, `defi-table`
* **New Package**: `your-category-component-name`

### Component File Naming Best Practices

* Use **descriptive, kebab-case names**: `conversation.tsx`, `input.tsx`, `reasoning.tsx`
* Avoid generic names like `component.tsx` or `index.tsx` (except for package exports)
* Name should reflect the component's primary function
* Keep names concise but clear

### Package Dependencies

When adding dependencies to your component:

1. **Add to package.json**: Include in the appropriate package's `package.json`
2. **Use workspace dependencies**: Reference other packages with `workspace:*`
3. **External dependencies**: Add specific versions for external packages

Example:

```json
{
  "dependencies": {
    "@repo/shadcn-ui": "workspace:*",  // Internal dependency
    "@repo/ai": "workspace:*",         // Cross-package dependency
    "react-markdown": "^10.1.0"       // External dependency
  }
}
```

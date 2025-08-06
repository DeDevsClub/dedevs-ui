# DeDevs UI Registry - Developer Instructions

This guide provides comprehensive instructions for contributing to the DeDevs UI Design Registry, including adding components, blocks, and deploying the registry.

## Table of Contents

* [Adding a New Component](#adding-a-new-component)
* [Adding a New Block](#adding-a-new-block)
* [Deploying the Registry](#deploying-the-registry)
* [Debugging Guide](#debugging-guide)
* [FAQ](#faq)

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
* **`@repo/ticker`** - Financial/data ticker components

### Decision Tree: Where to Add Your Component

Before creating a component, determine the correct approach:

#### Option 1: Add to Existing Package (Recommended)

**Choose this if your component:**

* Relates to AI interfaces → Add to `@repo/ai`
* Relates to code display/editing → Add to `@repo/code`
* Relates to financial/data tickers → Add to `@repo/ticker`
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

# For other existing packages
cd packages/your-target-package/
```

##### 2. Create Your Component File

Create a new `.tsx` file with a descriptive name:

```tsx
// packages/ai/your-feature.tsx (for AI components)
// packages/code/your-feature.tsx (for code components)

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

## Adding a New Block

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

## Deploying the Registry

### Overview

The DeDevs UI registry uses a multi-stage deployment process involving:

* CLI package deployment to NPM
* Documentation site deployment to Vercel
* Registry JSON hosting

### Deployment Process

#### 1. Pre-Deployment Checklist

* \[ ] All components are properly tested
* \[ ] Registry is generated and up-to-date
* \[ ] Documentation is complete
* \[ ] Version numbers are updated
* \[ ] All tests pass

#### 2. CLI Deployment

The CLI is deployed automatically via GitHub Actions:

```bash
# Trigger release workflow
gh workflow run release.yml
```

Or manually:

```bash
# Build the CLI
npx tsup

# Publish to NPM (requires NPM_TOKEN)
npm publish
```

#### 3. Documentation Site Deployment

The documentation site is automatically deployed to Vercel on push to main:

```bash
# Build documentation locally to test
cd apps/docs
pnpm run build

# Start production server locally
pnpm run start
```

#### 4. Registry Updates

The `registry.json` file is automatically updated when:

* New components are added to packages
* The generation script is run
* Changes are pushed to the main branch

### Manual Deployment Steps

1. **Update Version Numbers**:
   ```bash
   # Update root package.json version
   npm version patch|minor|major
   ```

2. **Generate Registry**:
   ```bash
   pnpm run gen:registry
   ```

3. **Build and Test**:
   ```bash
   pnpm run build
   pnpm run test
   ```

4. **Commit and Push**:
   ```bash
   git add .
   git commit -m "feat: add new components and update registry"
   git push origin main
   ```

5. **Create Release**:
   ```bash
   gh release create v0.x.x --generate-notes
   ```

## Debugging Guide

### Common Issues and Solutions

#### Registry Generation Issues

**Problem**: Component not appearing in registry

**Solutions**:

* Ensure file has `.tsx` or `.ts` extension
* Check that the component is in a valid package directory
* Verify the component exports are properly formatted
* Run `pnpm run gen:registry` manually

**Problem**: Incorrect component descriptions

**Solutions**:

* Update `COMPONENT_DESCRIPTIONS` in `scripts/generateRegistry.ts`
* Ensure component names match the mapping keys
* Re-run registry generation

#### Build Issues

**Problem**: TypeScript compilation errors

**Solutions**:

* Check `tsconfig.json` configuration
* Ensure all dependencies are properly installed
* Verify import paths are correct
* Run `pnpm run build` to see detailed errors

**Problem**: Missing dependencies

**Solutions**:

* Run `pnpm install` in the root directory
* Check workspace dependencies in package.json files
* Ensure peer dependencies are satisfied

#### CLI Issues

**Problem**: CLI not installing components correctly

**Solutions**:

* Verify registry.json is accessible and valid
* Check component file paths in registry entries
* Ensure target project has required dependencies
* Test with `dedevs-ui add component-name --dry-run`

#### Deployment Issues

**Problem**: Documentation site build failures

**Solutions**:

* Check Next.js configuration
* Verify all imports are resolvable
* Ensure environment variables are set
* Test build locally first

**Problem**: NPM publish failures

**Solutions**:

* Verify NPM authentication
* Check package.json configuration
* Ensure version number is incremented
* Verify build artifacts exist

### Debugging Commands

```bash
# Check registry generation
pnpm run gen:registry

# Validate registry JSON
node -e "console.log(JSON.parse(require('fs').readFileSync('registry.json', 'utf8')))"

# Test CLI locally
node dist/index.js add component-name --dry-run

# Check build output
pnpm run build 2>&1 | tee build.log

# Validate TypeScript
npx tsc --noEmit

# Check dependencies
pnpm list --depth=0
```

### Logging and Monitoring

* **Build Logs**: Available in GitHub Actions workflow runs
* **Deployment Logs**: Available in Vercel dashboard
* **NPM Logs**: Available in NPM package dashboard
* **Error Tracking**: Integrated with Sentry for runtime errors

## FAQ

### General Questions

**Q: How do I know if my component is compatible with the registry?**

A: Components should:

* Be built with React and TypeScript
* Use Tailwind CSS for styling
* Follow the established patterns in existing components
* Include proper TypeScript types
* Be self-contained with minimal external dependencies

**Q: Can I add components that depend on external APIs?**

A: Yes, but ensure:

* API dependencies are clearly documented
* Components gracefully handle API failures
* Required environment variables are documented
* Consider providing mock data for development

**Q: How do I update an existing component?**

A: Simply edit the component file and run the registry generation script. The registry will automatically update with the new version.

### Technical Questions

**Q: Why isn't my component showing up in the CLI?**

A: Check:

1. Component file is in a valid package directory
2. File has `.tsx` or `.ts` extension
3. Registry has been regenerated
4. Component is properly exported
5. Registry JSON is valid

**Q: How do I handle component dependencies?**

A: Add dependencies to your package's `package.json`. The CLI will inform users about required dependencies when installing components.

**Q: Can I create components that use server-side features?**

A: Yes, but clearly mark them as server components and document any special requirements or limitations.

**Q: How do I test my components before submitting?**

A:

1. Add them to the documentation site
2. Test with the CLI locally
3. Run the build process
4. Test in a separate Next.js project

### Workflow Questions

**Q: How often should I regenerate the registry?**

A: The registry should be regenerated whenever you:

* Add new components
* Modify component files
* Change component descriptions
* Update package structure

**Q: What's the review process for new components?**

A:

1. Create a pull request with your changes
2. Ensure all tests pass
3. Request review from maintainers
4. Address feedback and iterate
5. Merge after approval

**Q: How do I handle breaking changes?**

A:

1. Document breaking changes clearly
2. Update version numbers appropriately
3. Provide migration guides
4. Consider deprecation warnings for major changes

**Q: Can I contribute themes or styling variations?**

A: Yes! Create theme variants as separate components or provide styling props that allow customization while maintaining the core functionality.

### Troubleshooting

**Q: My build is failing with dependency errors**

A:

1. Clear node\_modules: `rm -rf node_modules && pnpm install`
2. Check for version conflicts in package.json files
3. Ensure workspace dependencies use `workspace:*`
4. Verify peer dependencies are satisfied

**Q: The CLI can't find my component**

A:

1. Check registry.json contains your component
2. Verify file paths are correct
3. Ensure component is properly exported
4. Test registry JSON validity

**Q: Documentation site won't start**

A:

1. Check for TypeScript errors
2. Verify all imports are resolvable
3. Ensure required environment variables are set
4. Check Next.js configuration

For additional support, please:

* Check existing GitHub issues
* Create a new issue with detailed reproduction steps
* Join our Discord community for real-time help
* Review the architecture documentation for system understanding

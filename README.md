# 🎨 DeDevs UI Design Registry

> **A production-ready component registry designed for developers building AI Applications, Decentralized Applications, Developer Tools, and Professional Portfolios.**

DeDevs UI is a comprehensive design system and component registry built with shadcn/ui compatibility and custom CLI tooling. It provides specialized components and patterns specifically crafted for modern development needs, enabling developers to rapidly build sophisticated applications across multiple domains.

## 🌟 Why Choose DeDevs UI?

### **For AI Application Developers**

* **AI-specific components**: Chat interfaces, conversation branches, AI response displays
* **Interactive elements**: Code blocks with syntax highlighting, copy functionality
* **Real-time features**: Live data visualization and streaming content support
* **Modern UX patterns**: Optimized for AI-driven user experiences

### **For Decentralized Application (dApp) Builders**

* **Web3 components**: Wallet connection interfaces, transaction displays
* **Blockchain interactions**: Smart contract integration patterns
* **Crypto-native UX**: Token displays, NFT galleries, DeFi interfaces
* **Security-first design**: Built-in best practices for Web3 security

### **For Developer Tool Creators**

* **Code-centric components**: Advanced editors, syntax highlighting, diff viewers
* **Documentation tools**: API explorers, interactive examples
* **Development workflows**: Build status indicators, deployment dashboards
* **CLI integration**: Seamless command-line tool interfaces

### **For Professional Portfolio Sites**

* **Showcase components**: Project galleries, skill matrices, timeline displays
* **Interactive elements**: Live demos, code previews, contact forms
* **Professional layouts**: Resume sections, testimonial displays
* **Performance optimized**: Fast loading, SEO-friendly components

## 🏗️ Architecture Overview

This monorepo is built with **Turborepo** and follows a modular architecture:

```
dedevs-ui/
├── apps/
│   └── docs/                    # Next.js documentation site
│       ├── app/                 # App router pages
│       ├── content/             # MDX documentation
│       └── public/registry/     # Generated component registry
├── packages/
│   ├── ai/                      # AI-specific components
│   ├── code-block/              # Code display components
│   ├── editor/                  # Editor components
│   ├── shadcn-ui/               # Base shadcn/ui components
│   ├── snippet/                 # Code snippet components
│   └── ui/                      # Custom UI components
├── scripts/
│   ├── index.ts                 # CLI entry point
│   ├── generate-registry.js     # Registry generation
│   ├── discover-components.js   # Component discovery
│   └── register-all-components.js # Batch registration
└── dist/
    └── index.js                 # Built CLI executable
```

### **Core Components**

1. **📦 Component Packages**: Modular packages containing reusable components
2. **🛠️ CLI Tool**: Custom CLI for installing components (`npx your-registry add component`)
3. **📚 Documentation Site**: Next.js app with live examples and installation guides
4. **🤖 Automation Scripts**: Tools for component discovery and registry generation
5. **📋 Registry System**: JSON-based component metadata and file definitions

## 🚀 Quick Start

### Prerequisites

* **Node.js** 18+ and **pnpm** (recommended)
* **Git** for version control

### 1. Installation via CLI

```bash
# Install components directly from the registry
npx dedevs-ui add button card dialog

# Or install the CLI globally
npm install -g dedevs-ui
dedevs-ui add ai-chat code-block editor
```

### 2. Local Development Setup

```bash
# Clone the repository for local development
git clone https://github.com/DeDevsClub/dedevs-ui.git
cd dedevs-ui

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The documentation site will be available at `http://localhost:3422`

### 3. Component Categories

#### AI Application Components

* **AI Chat**: Conversation interfaces with streaming support
* **AI Branch**: Multi-path conversation displays
* **Code Block**: Syntax-highlighted code with AI integration
* **Response Display**: AI-generated content presentation

#### Developer Tool Components

* **Editor**: Advanced code editing interfaces
* **Snippet**: Code snippet management and display
* **Terminal**: Command-line interface components
* **Documentation**: Interactive API documentation

#### Portfolio & Professional Components

* **Project Showcase**: Portfolio project displays
* **Skill Matrix**: Technology and skill visualization
* **Timeline**: Career and project timelines
* **Contact Forms**: Professional contact interfaces

## 🔧 Component Development

### Creating New Components

#### 1. Manual Component Creation

Create a new package in `packages/`:

```bash
mkdir packages/your-component
cd packages/your-component
```

Create the component structure:

```
packages/your-component/
├── package.json
├── src/
│   └── index.tsx
└── README.md
```

#### 2. Component Package Structure

**`package.json`**:

```json
{
  "name": "@repo/your-component",
  "version": "0.0.1",
  "private": true,
  "main": "src/index.tsx",
  "types": "src/index.tsx"
}
```

**`src/index.tsx`**:

```tsx
import React from 'react';
import { cn } from '@/lib/utils';

export interface YourComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export const YourComponent = ({ className, children, ...props }: YourComponentProps) => {
  return (
    <div className={cn('your-component-styles', className)} {...props}>
      {children}
    </div>
  );
};

export default YourComponent;
```

### Registry Building Process

#### Automated Registry Generation

This starter kit includes an automated registry generation system that scans your components and builds the complete registry with a single command.

**Quick Start - Build Complete Registry:**

```bash
# Generate and build the complete registry in one command
pnpm run registry
```

This command will:

1. Scan all packages for component files
2. Generate the `registry.json` file with proper shadcn/ui schema
3. Build individual component JSON files in `public/r/`
4. Make your registry ready for CLI consumption

#### Individual Commands

For more granular control, you can run each step separately:

```bash
# 1. Generate the registry.json file by scanning packages
pnpm run gen:registry

# 2. Build the registry (creates individual JSON files)
pnpm run build:registry
```

#### How It Works

The automated system:

* **Scans `packages/` directory**: Automatically discovers all TypeScript/TSX component files
* **Excludes config packages**: Ignores `eslint-config`, `typescript-config`, and `shadcn-ui` packages
* **Handles AI components**: Special logic for the `ai` package to create individual registry entries
* **Generates descriptions**: Maps component names to meaningful descriptions
* **Creates proper schema**: Follows the official shadcn/ui registry format

#### Adding New Components

When you add new components:

1. Create your component in the appropriate `packages/` directory
2. Run `pnpm run registry` to regenerate the complete registry
3. Your new component will be automatically discovered and included

#### Registry Structure

The automated process creates:

* `registry.json` - Main registry file with all component metadata
* `public/r/[component].json` - Individual component files for CLI consumption

### Registry File Structure

Each component generates a registry file like this:

```json
{
  "name": "your-component",
  "description": "A custom component for your design system",
  "dependencies": ["@radix-ui/react-slot"],
  "devDependencies": ["@types/react"],
  "registryDependencies": ["utils"],
  "files": [
    {
      "name": "your-component.tsx",
      "content": "...component source code..."
    }
  ],
  "type": "components:ui"
}
```

### Registry Generation Script Details

The `scripts/generateRegistry.ts` file is the heart of the automated registry system. Here's how it works:

#### Script Features

* **Automatic Package Discovery**: Scans the `packages/` directory for all subdirectories
* **Component File Detection**: Identifies `.ts` and `.tsx` files while excluding test files
* **Smart AI Component Handling**: Creates individual registry entries for each file in the `ai` package
* **Description Mapping**: Uses a predefined dictionary to provide meaningful component descriptions
* **Proper Schema Generation**: Creates registry files that comply with shadcn/ui standards

#### Customizing the Script

To customize the registry generation for your needs:

1. **Update Component Descriptions**: Edit the `COMPONENT_DESCRIPTIONS` object in `scripts/generateRegistry.ts`:

```typescript
const COMPONENT_DESCRIPTIONS: Record<string, string> = {
  'your-component': 'Description of your component',
  'another-component': 'Another component description',
  // Add your components here
};
```

2. **Modify Package Exclusions**: Update the `excludedPackages` array:

```typescript
const excludedPackages = ['eslint-config', 'typescript-config', 'your-excluded-package'];
```

3. **Change Registry Metadata**: Update the registry object properties:

```typescript
const registry: Registry = {
  $schema: 'https://ui.shadcn.com/schema/registry.json',
  name: 'your-registry-name',
  homepage: 'https://your-registry-homepage.com',
  items: allItems
};
```

#### Script Output

When you run `pnpm run gen:registry`, you'll see output like:

```
🔍 Scanning packages directory...
📦 Processing package: ai
📦 Processing package: code-block
📦 Processing package: editor
✅ Registry generated successfully!
📄 Generated 14 component(s):
   - ai-branch: AI conversation branch component
   - code-block: Enhanced code block component
   - editor: Code editor component
💾 Registry saved to: registry.json
```

## 📦 CLI Development and Publishing

### Building the CLI

```bash
# Build the CLI
pnpm build:cli

# Test the CLI locally
pnpm test:cli
```

### Publishing Your Registry

#### 1. Prepare for Publishing

Ensure your registry is complete:

```bash
# Generate and build the complete registry
pnpm run registry

# Build the CLI
pnpm run build:cli

# Build the documentation site
pnpm run build
```

#### 2. Publish to npm

```bash
# Patch version (bug fixes)
pnpm publish:patch

# Minor version (new features)
pnpm publish:minor

# Major version (breaking changes)
pnpm publish:major
```

#### 3. Deploy Documentation

Deploy your docs site to Vercel, Netlify, or your preferred platform:

```bash
# For Vercel
vercel --prod

# For Netlify
netlify deploy --prod --dir=apps/docs/out
```

### Using DeDevs UI Registry

Install components from the DeDevs UI registry:

```bash
# Install components using npx
npx dedevs-ui add ai-chat code-block editor

# Or install globally
npm install -g dedevs-ui
dedevs-ui add button card dialog
```

## 🛠️ Development Workflow

### Daily Development

```bash
# Start development server
pnpm dev

# Add new components to packages/
# Regenerate the complete registry
pnpm run registry

# Test CLI locally
pnpm run test:cli
```

### Quality Assurance

```bash
# Lint code
pnpm lint

# Format code
pnpm format

# Type checking
pnpm build

# Validate registry
pnpm validate:registry
```

### Release Process

1. **Update components** and test locally
2. **Run full discovery and registration**:
   ```bash
   pnpm discover:components
   pnpm register:all
   pnpm gen:registry
   ```
3. **Build and test CLI**:
   ```bash
   pnpm build:cli
   pnpm test:cli
   ```
4. **Commit changes** and create release
5. **Publish to npm**:
   ```bash
   pnpm publish:minor  # or patch/major
   ```
6. **Deploy documentation** to your hosting platform

## 📋 Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build all packages and apps |
| `pnpm build:cli` | Build CLI executable |
| `pnpm test:cli` | Test CLI locally |
| `pnpm run gen:registry` | Generate registry.json by scanning packages |
| `pnpm run build:registry` | Build individual component JSON files |
| `pnpm run registry` | Complete registry generation and build |
| `pnpm publish:patch/minor/major` | Version bump and publish |
| `pnpm lint` | Lint codebase |
| `pnpm format` | Format code |
| `pnpm clean` | Clean node\_modules and build artifacts |
| `pnpm bump-deps` | Update all dependencies |
| `pnpm bump-ui` | Update shadcn/ui components |

## 🎯 Best Practices

### Component Development

* **Follow shadcn/ui patterns** for consistency
* **Use TypeScript** for type safety
* **Include proper prop interfaces** and documentation
* **Add examples** in your documentation
* **Test components** thoroughly before publishing

### Registry Management

* **Run `pnpm run registry`** after adding new components to regenerate the complete registry
* **Update component descriptions** in `scripts/generateRegistry.ts` for new components
* **Test the CLI** with `pnpm run test:cli` before publishing
* **Version components** appropriately using semantic versioning
* **Document breaking changes** in release notes

### CLI Distribution

* **Test CLI locally** before publishing
* **Follow semantic versioning** for releases
* **Provide clear error messages** for users
* **Include helpful documentation** and examples

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests for any improvements.

### Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/dedevs-ui.git`
3. Install dependencies: `pnpm install`
4. Create a feature branch: `git checkout -b feature/amazing-feature`
5. Make your changes and test thoroughly
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🔗 Resources

* **[shadcn/ui](https://ui.shadcn.com)** - Original inspiration and compatibility target
* **[Turborepo](https://turbo.build)** - Monorepo build system
* **[Next.js](https://nextjs.org)** - Documentation framework
* **[Tailwind CSS](https://tailwindcss.com)** - Styling framework
* **[Radix UI](https://radix-ui.com)** - Primitive components

***

**Ready to accelerate your development with DeDevs UI?** 🚀

Whether you're building AI applications, decentralized apps, developer tools, or professional portfolios, DeDevs UI provides the components and patterns you need. Start by installing components via CLI or explore the full documentation to see what's available for your next project!

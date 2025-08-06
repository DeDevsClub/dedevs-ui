# DeDevs UI CLI

A command-line interface for adding components from the DeDevs UI Design Registry to your React projects.

## Installation

You don't need to install the CLI globally. Use it directly with `npx`:

```bash
npx dedevs-ui add button
```

## Usage

### Add Components

Add a single component:

```bash
npx dedevs-ui add button
```

Add multiple components:

```bash
npx dedevs-ui add button card dialog
```

### Help

Show help information:

```bash
npx dedevs-ui --help
```

The help command will show all available commands including:

* `add` - Add components to your project
* `list` (or `ls`) - List all available components
* `--version` - Show version information
* `--help` - Show help information

### Version

Show version information:

```bash
npx dedevs-ui --version
```

### List Components

List all available components in the registry:

```bash
npx dedevs-ui list
```

This command will display:

* Component names
* Brief descriptions
* Component types (AI, utility, etc.)

Example output:

```
Available components:

🤖 AI Components:
  ai-branch       AI conversation branch component for displaying branched conversations
  ai-conversation AI conversation container component
  ai-input        AI chat input component with advanced features
  ai-message      AI message display component
  ai-reasoning    AI reasoning visualization component
  ai-response     AI response component with streaming support
  ai-source       AI source attribution component
  ai-suggestion   AI suggestion component for prompts and recommendations
  ai-tool         AI tool component for function calling interfaces

🛠️  Utility Components:
  code-block      Enhanced code block component with syntax highlighting
  code-editor     Code editor component
  code-snippet    Code snippet component

📊 Defi Components:
  defi-ticker     Ticker component for displaying real-time data
```

You can also use the short alias:

```bash
npx dedevs-ui ls
```

## Available Components

You can view all available components in two ways:

1. **Using the CLI**: Run `npx dedevs-ui list` to see all components with descriptions
2. **Online**: Visit <https://dedevs-ui.dedevs.com> to browse components with live examples and documentation

## How It Works

The CLI uses the [shadcn/ui CLI](https://ui.shadcn.com) under the hood to install components from our registry. It:

1. Fetches the component configuration from our registry
2. Downloads the component files
3. Installs any required dependencies
4. Adds the component to your project

## Requirements

* Node.js 18 or higher
* A React project with Tailwind CSS
* Internet connection

## Troubleshooting

### Component Not Found

If you get a "component not found" error, make sure:

* The component name is spelled correctly
* The component exists in our registry (use `npx dedevs-ui list` to see all available components)
* You have an internet connection

### Permission Errors

If you encounter permission errors, try:

* Running with `sudo` (not recommended)
* Using a Node version manager like `nvm`
* Checking your npm permissions

### List Command Issues

If the `list` command doesn't work or shows no components:

* Check your internet connection
* Ensure access to `dedevs-ui.dedevs.com`
* Try running `npx dedevs-ui@latest list` to use the latest version

### Network Issues

If you're behind a corporate firewall:

* Check your proxy settings
* Ensure access to `registry.npmjs.org` and `dedevs-ui.dedevs.com`

## Development

### Building the CLI

```bash
npm run build:cli
```

### Testing Locally

```bash
npm run test:cli
```

### Publishing

```bash
# Patch version (0.0.1 → 0.0.2)
npm run pub:patch

# Minor version (0.0.1 → 0.1.0)
npm run pub:minor

# Major version (0.0.1 → 1.0.0)
npm run pub:major
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test the CLI locally
5. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) for details.

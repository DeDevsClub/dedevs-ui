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

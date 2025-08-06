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

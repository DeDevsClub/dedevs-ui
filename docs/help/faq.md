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

# Design Registry Update Checklist

Use this quick checklist to add either a Component or a Block to the DeDevs UI Design Registry.

## Add a Component

- [ ] Choose package (follow package-based architecture; do NOT create standalone packages)
  - Prefer existing packages like `packages/ai/`, `packages/code/`, `packages/defi/`, `packages/shadcn-ui/`

- [ ] Create component file (descriptive kebab-case filename)
  - Example: `packages/defi/nft-card.tsx`
  - Add proper TypeScript props, Tailwind styling, accessibility

- [ ] Export from package index
  - Update `packages/<pkg>/index.tsx` to export the new component

- [ ] Add docs example(s)
  - Create `apps/docs/examples/<component-name>.tsx` (and basic/variant examples as needed)

- [ ] Add documentation page
  - Create `apps/docs/content/components/<component-name>.mdx`
  - Include: overview, install/usage, props, accessibility, examples

- [ ] Update navigation
  - Edit `apps/docs/content/components/meta.json` to include the component (alphabetical order in its section)

- [ ] Regenerate and build registry assets
  - Run: `pnpm run registry` (runs `gen:registry` and `build:registry`)

- [ ] Verify locally
  - Run: `pnpm dev` and check docs at the configured port

- [ ] Lint/format and commit
  - `pnpm format` and `pnpm lint`
  - Commit with concise message and open PR

## Add a Block

- [ ] Decide placement
  - Blocks are self-contained compositions built from existing components
  - Add within the most relevant package (e.g., `packages/ai/`, `packages/code/`, `packages/defi/`)

- [ ] Create block file (kebab-case)
  - Example: `packages/ai/chat-dashboard-block.tsx`
  - Ensure clear public API and internal composition of existing components

- [ ] Export from package index
  - Update `packages/<pkg>/index.tsx` to export the new block

- [ ] Mark as block in registry metadata (if applicable in generator conventions)
  - Follow existing patterns so the registry categorizes it as a “block”

- [ ] Add docs example(s)
  - `apps/docs/examples/<block-name>.tsx` (include realistic data and variants)

- [ ] Add documentation page
  - `apps/docs/content/components/<block-name>.mdx`
  - Clearly label as a Block and document composition, customization, and usage

- [ ] Update navigation
  - Add to `apps/docs/content/components/meta.json` in the correct section (alphabetical)

- [ ] Regenerate and build registry assets
  - Run: `pnpm run registry`

- [ ] Verify locally, lint/format, commit, open PR
  - `pnpm dev`, `pnpm format`, `pnpm lint`
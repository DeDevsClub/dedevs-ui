#!/bin/bash

set -euo pipefail

# Helpers
pmgr() {
  if command -v pnpm >/dev/null 2>&1; then echo pnpm; return; fi
  if command -v yarn >/dev/null 2>&1; then echo yarn; return; fi
  echo npm
}

root_dir() {
  git rev-parse --show-toplevel 2>/dev/null || pwd
}

# 1) Discoverability
function ui-help() {
  npx dedevs-ui --help
}

function ui-version() {
  npx dedevs-ui --version
}

function ui-list() {
  npx dedevs-ui list
}

# 2) Add components
function ui-add() {
  if [ -z "${1:-}" ]; then
    echo "Usage: ui-add <component-name>"
    return 1
  fi
  npx dedevs-ui add "$1"
}

function ui-add-many() {
  if [ "$#" -lt 1 ]; then
    echo "Usage: ui-add-many <component-1> <component-2> ..."
    return 1
  fi
  npx dedevs-ui add "$@"
}

# Alias to keep old name working
function add-component() { ui-add "$@"; }

# 3) Local dev on CLI (from monorepo root)
function ui-build-cli() {
  local mgr; mgr=$(pmgr)
  (cd "$(root_dir)" && $mgr run build:cli)
}

function ui-test-cli() {
  # Prints CLI help to verify build artifact
  ui-build-cli
  node "$(root_dir)/dist/index.js" --help
}

# 4) Registry workflows (see docs/registry/* and package.json)
function ui-gen-registry() {
  # Generate registry JSON from packages
  local mgr; mgr=$(pmgr)
  (cd "$(root_dir)" && $mgr run gen:registry)
}

function ui-build-registry() {
  # Build shadcn registry and copy public assets for docs
  local mgr; mgr=$(pmgr)
  (cd "$(root_dir)" && $mgr run build:registry)
}

function ui-registry() {
  ui-gen-registry && ui-build-registry
}

# 5) Publishing wrappers (call existing scripts)
# NOTE: These run the repo-defined scripts which may publish to npm.
# Ensure you're authenticated and on the correct branch/tag.
function ui-pub-patch() { (cd "$(root_dir)" && $(pmgr) run pub:patch); }
function ui-pub-minor() { (cd "$(root_dir)" && $(pmgr) run pub:minor); }
function ui-pub-major() { (cd "$(root_dir)" && $(pmgr) run pub:major); }

# 6) Add from a local JSON file via shadcn (validates registry item locally)
function ui-add-from-file() {
  if [ -z "${1:-}" ]; then
    echo "Usage: ui-add-from-file </absolute/or/relative/path/to/registry-item.json>"
    return 1
  fi

  # Ensure shadcn is initialized if needed (non-interactive)
  if [ ! -f components.json ]; then
    echo "Initializing shadcn components.json"
    npx shadcn@latest init -y >/dev/null 2>&1 || true
  fi

  npx shadcn@latest add "$1"
}

# 7) App-targeted add (useful in monorepo to add into a specific app path)
function ui-add-in() {
  if [ "$#" -lt 2 ]; then
    echo "Usage: ui-add-in <app-path> <component-name> [more components...]"
    echo "Example: ui-add-in apps/web ai-response"
    return 1
  fi
  local app_path="$1"; shift
  (cd "$app_path" && npx dedevs-ui add "$@")
}

# 8) Quick sanity workflows
function ui-sanity() {
  ui-test-cli
  ui-list
}

# 9) Monorepo dev and maintenance
function ui-dev-root() { (cd "$(root_dir)" && $(pmgr) run dev); }
function ui-lint() { (cd "$(root_dir)" && $(pmgr) run lint); }
function ui-format() { (cd "$(root_dir)" && $(pmgr) run format); }
function ui-analyze() { (cd "$(root_dir)" && $(pmgr) run analyze); }
function ui-bump-deps() { (cd "$(root_dir)" && $(pmgr) run bump-deps); }

# Be careful: this uses git clean -xdf node_modules (as defined in package.json)
function ui-clean() { (cd "$(root_dir)" && $(pmgr) run clean); }

# 10) Docs/dev convenience
function ui-docs-dev() {
  # Prefer running the full monorepo dev since docs relies on workspace
  ui-dev-root
}

# 11) Quick convenience installers
function ui-add-ai-response-web() { (cd "apps/web" && npx dedevs-ui add ai-response); }
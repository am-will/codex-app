# Reference Build Mapping

## Canonical Input

- Upstream package source: `codex-3-12/app/resources/`
- Upstream packaging label: `codex-3-12`
- Packaged JS app version: `26.309.31024`
- Build flavor: `prod`
- Build number: `962`
- Bundled Electron version: `40.0.0`
- Packaged app entrypoint: `.vite/build/bootstrap.js`

## Reconstruction Workspace

- Active reconstruction app: `desktop/`
- Runtime stack: Electron Forge + Vite + TypeScript
- Current local starting point:
  - packaged successfully on Linux
  - launched successfully on Linux
  - validated via `agent-browser` over CDP against the packaged app

## Mapping Decision

Because no original pnpm workspace is available, this repository uses the packaged upstream bundle in `codex-3-12/app/resources/` as the canonical behavioral reference and `desktop/` as the implementation workspace for the Linux reconstruction.

## Reference Inputs

- Primary parity oracle: packaged upstream bundle in `codex-3-12/app/resources/`
- Secondary parity oracle: mac app exists conceptually but is not present locally in this repository

## Known Constraints

- Internal workspace packages referenced by the extracted bundle are unavailable as source:
  - `app-server-types`
  - `protocol`
  - `shared-node`
- Native binaries in the extracted package are mixed-platform artifacts, but the shipped Electron host and several native modules are Windows-specific in that bundle.

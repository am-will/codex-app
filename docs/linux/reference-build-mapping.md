# Reference Build Mapping

## Canonical Input

- Canonical current upstream payload root: `codex/`
- Upstream packaging label: `codex`
- Windows package manifest version: `26.325.2171.0`
- Packaged JS app version: `26.325.21211`
- Build flavor: `prod`
- Build number: `1255`
- Bundled Electron version: `40.0.0`
- Packaged app entrypoint: `.vite/build/bootstrap.js`
- Recovered hashed main bundle: `.vite/build/main-I2_kj945.js`
- Recovered renderer entry: `webview/assets/index-CQAG2N8w.js`

## Reconstruction Workspace

- Active reconstruction app: `desktop/`
- Runtime stack: Electron Forge + Vite + TypeScript
- Current local starting point:
  - packaged successfully on Linux
  - launched successfully on Linux
  - validated via `agent-browser` over CDP against the packaged app

## Mapping Decision

Because no original pnpm workspace is available, this repository uses the packaged upstream bundle in `codex/` as the canonical behavioral reference and `desktop/` as the implementation workspace for the Linux reconstruction.

Version policy for the current line:

- `26.325.2171.0` identifies the imported Windows package payload.
- `26.325.21211` drives `desktop/package.json`, Linux artifact names, and visible Electron app version surfaces.
- `1255` is the embedded build number carried by the Linux wrapper metadata.

## Reference Inputs

- Primary parity oracle: packaged upstream bundle in `codex/`
- Secondary parity oracle: mac app exists conceptually but is not present locally in this repository

## Known Constraints

- Internal workspace packages referenced by the extracted bundle are unavailable as source:
  - `app-server-types`
  - `protocol`
  - `shared-node`
- Native binaries in the extracted package are mixed-platform artifacts, but the shipped Electron host and several native modules are Windows-specific in that bundle.

# Native Runtime Inventory And Rebuild Strategy

## Current Upstream Input

- Desktop payload: `26.707.31123`
- Build number: `5042`
- App brand: `chatgpt`
- Electron: `42.1.0`
- Entry point: `.vite/build/early-bootstrap.js`
- Bootstrap chunk: `.vite/build/bootstrap-CPtwLWh9.js`
- Main-process chunk: `.vite/build/main-C2EbnYJv.js`
- Matched Codex helper package: `@openai/codex@0.144.0-alpha.4`

The recovered JavaScript payload comes from the production ChatGPT macOS app. Mach-O
binaries and native modules from that app are never copied into Linux artifacts.

## Linux Runtime Boundary

The packaged app has four native/runtime layers:

- Electron and the recovered JavaScript payload in `resources/app.asar`
- Linux-rebuilt `better-sqlite3` and `node-pty` modules in
  `resources/app.asar.unpacked/node_modules`
- a stable `resources/codex` launcher that delegates to the version-matched helper
- the complete helper package in `resources/codex-vendor`

The helper package must remain intact. The current app-server expects more than the
main `codex` binary:

```text
resources/codex
resources/codex-vendor/bin/codex
resources/codex-vendor/bin/codex-code-mode-host
resources/codex-vendor/codex-package.json
resources/codex-vendor/codex-path/rg
resources/codex-vendor/codex-resources/bwrap
resources/codex-vendor/codex-resources/zsh/bin/zsh
resources/git
resources/rg
```

`resources/rg` remains a top-level helper for the recovered desktop executable lookup.
The vendor copy is required by the Codex helper's own package-relative discovery.

## Hydration

The vendor tree is generated and ignored by git. Local package commands and release CI
hydrate it from the exact `codexCliVersion` in `desktop/package.json`:

```bash
cd desktop
npm run hydrate:codex:linux
```

For arm64:

```bash
cd desktop
npm run hydrate:codex:linux -- --arch arm64
```

The hydrator validates `codex-package.json`, the target triple, and all required helper
paths before treating an existing tree as current.

## Native Modules

`npm run rebuild:natives` rebuilds `better-sqlite3` and `node-pty` for Electron 42.1.0.
The runtime assembler then copies only the Linux `.node` files into the recovered app
before creating `app.asar`.

## Verification

```bash
cd desktop
npm run test:linux
npm run package
node scripts/verify-linux-package-contract.mjs \
  --package-root out/Codex-linux-x64
```

The package verifier checks the app version and build, the ChatGPT/GPT-5.6 markers,
the complete helper layout, executable modes, helper version, and app-server launch.

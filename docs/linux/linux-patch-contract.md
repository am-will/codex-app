# Linux Patch Contract

Updated: 2026-07-09.

## Current Target

| Area | Target |
|---|---|
| App version | `26.707.31123` |
| Build | `5042` |
| App brand | `chatgpt` |
| Electron | `42.1.0` |
| Entry point | `.vite/build/early-bootstrap.js` |
| Bootstrap chunk | `.vite/build/bootstrap-CPtwLWh9.js` |
| Main-process chunk | `.vite/build/main-C2EbnYJv.js` |
| Worker | `.vite/build/worker.js` |
| Preload | `.vite/build/preload.js` |
| Renderer entry | `webview/assets/index-B6Kcpz4u.js` |
| App-server helper | `0.144.0-alpha.4` |

The implementation owner is `desktop/scripts/assemble-codex-runtime.mjs`. The tracked
`desktop/recovered/refresh-manifest.json` records every applied or intentionally skipped
patch for this payload.

## Active Contracts

| Contract | Runtime behavior | Verification |
|---|---|---|
| browser session helper | Stage `scripts/linux-browser-launch.js` and preserve the active Chrome-family profile for external auth URLs | `browser-session-launch.test.js` |
| preload IPC retry | Retry the known early `sendMessageFromView` handler race and rethrow unrelated failures | `recovered-bundle.red.test.ts` |
| title-bar preload bridge | Expose trusted Linux minimize, maximize, close, and application-menu IPC | recovered bundle and package marker tests |
| helper PATH | Prepend `process.resourcesPath` so packaged `codex`, `git`, and `rg` resolve | bootstrap assertions |
| X11 startup | Replace the upstream Linux Wayland switches with the tested X11 launch path | bootstrap assertions and graphical smoke |
| startup stack logging | Print bootstrap import failures before Sentry/error-dialog handling | bootstrap assertions |
| git-origin filtering | Remove missing persisted workspace roots before git-origin requests | recovered bundle tests |
| external auth browser | Route Linux auth opens through the browser-session helper with `shell.openExternal` fallback | browser-session tests |
| Linux window chrome | Use hidden title bar, visible overlay colors, trusted window-control IPC, application-menu serialization, and explicit focus | window and recovered bundle tests |
| ChatGPT app-shell chrome | Render inline Linux controls and application submenus and reserve the required layout space | package marker and recovered bundle tests |
| startup surface | Use opaque dark/light OpenAI startup colors without fade or shimmer artifacts | `window-background.test.js` |
| Linux native modules | Replace Mach-O native modules with Electron 42 Linux rebuilds before creating `app.asar` | recovered bundle and package tests |
| complete Codex helper | Package a stable launcher plus `codex-vendor` metadata, code-mode host, ripgrep, bubblewrap, and zsh | package verifier |
| push-protection disambiguation | Preserve generated task fields, asset paths, and the public Mapbox token through no-op source interpolation so GitHub does not classify adjacent `sk.`/`pk.` text as a secret | recovered bundle tests |

## ChatGPT Brand Gates

The 26.707 payload is not the older standalone Codex app. These old patch surfaces are
absent or already implemented differently and must remain explicit no-op results:

- workspace-root drop handler
- renderer thread-start protocol shims
- renderer request-client protocol shims
- standalone dynamic-tool compatibility rewrites
- standalone Linux open-in target registry injection
- legacy avatar/Pet Surface renderer patches
- model-settings rewrites that the current bundle no longer needs

The assembler uses `codexAppBrand === "chatgpt"` for these decisions. A missing patch
target must not be treated as success unless the brand gate or an equivalent upstream
marker explains the skip.

## Patch Rules

- Resolve hashed bundles by behavior-bearing prefixes and markers, not one fixed hash.
- Preserve the upstream minified provider/function identifiers in replacements.
- Require exactly one matching alternative for behavior that is not already present.
- Keep applied and skipped results in `refresh-manifest.json`.
- Never copy native binaries from the macOS archive into Linux artifacts.
- Keep the desktop payload version, build number, Electron version, and Codex helper
  version as separate streams.

## Coverage

| Test | Contract area |
|---|---|
| `recovered-bundle.red.test.ts` | refresh reproducibility, brand gates, bootstrap, preload, main, renderer, metadata |
| `codex-package.red.test.ts` | hydration, release workflow, package resources, arm64/x64 contracts |
| `window-background.test.js` | primary-window and startup-surface behavior |
| `browser-session-launch.test.js` | Linux external-browser session handoff |
| `t8-recovered-bundle.red.test.ts` | entrypoint, recovered bundle, and Forge inclusion |
| `verify-linux-package-contract.mjs` | final app markers, helper layout/version, executable modes |

## Required Validation

```bash
cd desktop
npm run hydrate:codex:linux
npm run test:linux
npm run package
node scripts/verify-linux-package-contract.mjs \
  --package-root out/Codex-linux-x64
```

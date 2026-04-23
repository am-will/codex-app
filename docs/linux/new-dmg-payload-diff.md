# New DMG Payload Diff

Generated: 2026-04-23

## Source Artifact

- DMG: `/home/amwill/Applications/codex-app/Codex.dmg`
- DMG SHA-256: `65d3114117f1f03157e2968358e7c1bbaca48f3fe4a9bc9b71fc6f719e9702eb`
- Scratch extraction root: `/tmp/codex-dmg-refresh-7xio6x`
- Extracted app: `/tmp/codex-dmg-refresh-7xio6x/Codex Installer/Codex.app`
- Extracted asar: `/tmp/codex-dmg-refresh-7xio6x/app-asar-extracted`
- Extraction command class: direct `7z x -y Codex.dmg -o/tmp/codex-dmg-refresh-7xio6x`, then `desktop/node_modules/.bin/asar extract ...`.

The scratch paths are inspection aids only. The durable source of truth is the local ignored `Codex.dmg` plus the hashes and file inventories recorded here.

## New App Metadata

`Contents/Info.plist`:

| Key | Value |
| --- | --- |
| `CFBundleName` | `Codex` |
| `CFBundleDisplayName` | `Codex` |
| `CFBundleIdentifier` | `com.openai.codex` |
| `CFBundleShortVersionString` | `26.417.41555` |
| `CFBundleVersion` | `1858` |
| `CFBundleExecutable` | `Codex` |
| `CFBundleURLTypes` | `codex` scheme registered |

`app.asar`:

| Field | Value |
| --- | --- |
| Path | `/tmp/codex-dmg-refresh-7xio6x/Codex Installer/Codex.app/Contents/Resources/app.asar` |
| SHA-256 | `9ac28b09fdd98e065cb9fd807919a52d0d13139659ed9c68c881f06689cd4df9` |
| Size | `111169011` bytes |

`package.json` from extracted `app.asar`:

| Field | Current Recovered | New DMG |
| --- | --- | --- |
| `name` | `openai-codex-electron` | `openai-codex-electron` |
| `productName` | `Codex` | `Codex` |
| `version` | `26.415.20818` | `26.417.41555` |
| `main` | `.vite/build/bootstrap.js` | `.vite/build/bootstrap.js` |
| `devDependencies.electron` | `41.2.0` | `41.2.0` |
| `devDependencies.vite` | `8.0.3` | `8.0.3` |
| `devDependencies.typescript` | `^5.9.3` | `^5.9.3` |
| `dependencies.better-sqlite3` | `^12.8.0` | `^12.8.0` |
| `dependencies.node-pty` | `^1.1.0` | `^1.1.0` |
| `dependencies.@sentry/electron` | `^7.5.0` | `^7.5.0` |

Validation: the new payload metadata confirms `26.417.41555` / build `1858`.

## Build Asset Comparison

Current recovered `.vite/build` files:

```text
bootstrap.js
browser-sidebar-comment-preload.js
main-BnI_RVTn.js
preload.js
product-name-BA584x_m.js
worker.js
```

New DMG `.vite/build` files:

```text
bootstrap.js
browser-sidebar-comment-preload.js
main-C8I_nqq_.js
preload.js
worker.js
workspace-root-drop-handler-B6CbYVqW.js
```

Changed `.vite/build` inventory:

| Category | Files |
| --- | --- |
| New only | `main-C8I_nqq_.js`, `workspace-root-drop-handler-B6CbYVqW.js` |
| Current only | `main-BnI_RVTn.js`, `product-name-BA584x_m.js` |
| Shared | `bootstrap.js`, `browser-sidebar-comment-preload.js`, `preload.js`, `worker.js` |

## Webview Asset Comparison

The app webview file inventory still has the same high-level shape:

| Check | Count |
| --- | ---: |
| Current recovered `webview/assets` files | `817` |
| New DMG `webview/assets` files | `817` |
| Full `webview` filename diff, new only | `214` |
| Full `webview` filename diff, current only | `214` |
| Full `webview` filename diff, shared | `630` |

Representative new-only webview assets:

```text
assets/Combination-B1JaSv6T.js
assets/Page-67eXdKF_.js
assets/PopcornElectronDocumentPanel-BrcBPztU.js
assets/PopcornElectronPresentationPanel-DnPQMpsA.js
assets/PopcornElectronWorkbookPanel-CeT2_ybu.js
assets/agent-settings-BWbCw8mH.js
assets/app-server-manager-hooks-otoIIVsF.js
assets/chronicle-setup-state-D82knaKt.css
assets/chronicle-setup-state-DfRNL5BX.js
assets/codex-api-W_sHAw8n.js
```

Representative current-only webview assets:

```text
assets/Combination-DvdoCHO6.js
assets/Page-D-x9C-2n.js
assets/PopcornElectronDocumentPanel-DaKPqKna.js
assets/PopcornElectronPresentationPanel-BKdmJkj5.js
assets/PopcornElectronWorkbookPanel-DwF40Q2z.js
assets/agent-settings-veBDP0Nt.js
assets/app-server-manager-hooks-BhqlgFjc.js
assets/app-server-manager-signals-DfI-VLch.js
assets/codex-api-Bm0jF82b.js
assets/composer-atoms-BnKIUgCZ.js
```

The new DMG also carries external bundled plugin resources outside `app.asar` under:

```text
Contents/Resources/plugins/openai-bundled/.agents/plugins/marketplace.json
Contents/Resources/plugins/openai-bundled/plugins/browser-use/.codex-plugin/plugin.json
Contents/Resources/plugins/openai-bundled/plugins/browser-use/scripts/browser-client.mjs
Contents/Resources/plugins/openai-bundled/plugins/computer-use/.codex-plugin/plugin.json
Contents/Resources/plugins/openai-bundled/plugins/computer-use/.mcp.json
Contents/Resources/plugins/openai-bundled/plugins/computer-use/assets/app-icon.png
```

## Native Resource Comparison

New DMG `Contents/Resources` top-level payload includes:

```text
Assets.car
THIRD_PARTY_NOTICES.txt
app.asar
codex
codexTemplate.png
codexTemplate@2x.png
codex_chronicle
electron.icns
native/launch-services-helper
native/sparkle.node
node
node_repl
notification.wav
plugins/openai-bundled/...
rg
```

Native architecture check:

| Path | New DMG Type | Current Linux Baseline Type |
| --- | --- | --- |
| `Contents/Resources/codex` | Mach-O arm64 executable | `desktop/resources/bin/linux-x64/codex`: ELF x86-64 static PIE |
| `Contents/Resources/rg` | Mach-O arm64 executable | `desktop/resources/bin/linux-x64/rg`: ELF x86-64 static PIE |
| `Contents/Resources/node` | Mach-O arm64 executable | no direct Linux baseline equivalent in `desktop/resources/bin/linux-x64` |
| `native/launch-services-helper` | Mach-O arm64 executable | macOS-only helper, not in current Linux recovered baseline |
| `native/sparkle.node` | Mach-O arm64 bundle | macOS-only Sparkle bundle, not in current Linux recovered baseline |
| `app.asar.unpacked/.../better_sqlite3.node` | Mach-O arm64 bundle | current recovered module is ELF x86-64 shared object |
| `app.asar.unpacked/.../pty.node` | Mach-O arm64 bundle | current recovered module is ELF x86-64 shared object |
| `app.asar.unpacked/.../spawn-helper` | Mach-O arm64 executable | current recovered baseline uses Linux `node-pty` rebuilt artifacts |

Current recovered Linux native module summary from `desktop/recovered/refresh-manifest.json`:

```text
better-sqlite3/build/Release/better_sqlite3.node
node-pty/build/Release/pty.node
node-pty/build/Release/obj.target/pty.node
node-pty/bin/linux-x64-143/node-pty.node
node-pty/bin/linux-x64-145/node-pty.node
```

Conclusion: the new DMG native resources cannot be copied directly into the Linux package. Follow-on tasks must preserve the Linux helper binaries and rebuild or normalize native modules against Electron `41.2.0`.

## Refresh Script Failure

Reproduced with an output path under `/tmp` only:

```text
node desktop/scripts/refresh-recovered-from-dmg.mjs --dmg Codex.dmg --output /tmp/codex-dmg-refresh-script-output-BM7cVy/app-asar-extracted --keep-temp
```

Result:

```text
status=1
Error: git origins existing-path filter patch target not found in /tmp/codex-dmg-refresh-ib3LTA/app.asar.extracted/.vite/build/main-C8I_nqq_.js
    at buildMissingPatchTargetError (.../desktop/scripts/assemble-codex-runtime.mjs:269:10)
    at applyAlternativeStringPatch (.../desktop/scripts/assemble-codex-runtime.mjs:309:11)
    at applyPatchesToFile (.../desktop/scripts/assemble-codex-runtime.mjs:515:13)
    at patchCodexMainProcessBundle (.../desktop/scripts/assemble-codex-runtime.mjs:670:5)
```

This matches the known patch drift in the plan and confirms T5 must retarget the canonical patch implementation for `main-C8I_nqq_.js`.

## Static Validation

- `sha256sum Codex.dmg` recorded `65d3114117f1f03157e2968358e7c1bbaca48f3fe4a9bc9b71fc6f719e9702eb` before extraction.
- `plistutil -i .../Info.plist -f json` plus `jq` confirmed version `26.417.41555`, build `1858`, bundle id `com.openai.codex`, and `codex` URL scheme.
- `sha256sum .../Contents/Resources/app.asar` recorded `9ac28b09fdd98e065cb9fd807919a52d0d13139659ed9c68c881f06689cd4df9`.
- `find .../.vite/build` comparison listed the changed build files shown above.
- `find .../webview` comparison recorded `214` new-only names, `214` current-only names, and `630` shared names.
- `file` confirmed new DMG native binaries are Mach-O arm64 while current Linux baseline native modules and helper binaries are ELF x86-64.
- `git status --short` was clean immediately after direct DMG extraction. One accidental untracked repo-root `package.json` was later emitted by an asar CLI inspection path; it was verified as extracted upstream package metadata, moved to trash, and `git status --short` was clean again before report/plan edits.

## Reason Not Testable

This task is artifact inspection and structured diffing only. It does not change runtime behavior. Validation is static/manual: cryptographic hashes, plist/package metadata extraction, file inventory comparison, native binary type checks, refresh-script failure reproduction, and worktree status checks.

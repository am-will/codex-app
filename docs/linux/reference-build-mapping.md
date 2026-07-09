# Reference Build Mapping

## Canonical Input

- Production appcast payload: `ChatGPT-darwin-arm64-26.707.31123.zip`
- Packaged app version: `26.707.31123`
- Build flavor: `prod`
- Build number: `5042`
- App brand: `chatgpt`
- Electron: `42.1.0`
- Entry point: `.vite/build/early-bootstrap.js`
- Bootstrap chunk: `.vite/build/bootstrap-CPtwLWh9.js`
- Main-process chunk: `.vite/build/main-C2EbnYJv.js`
- Renderer entry: `webview/assets/index-B6Kcpz4u.js`
- Codex helper: `@openai/codex@0.144.0-alpha.4`

The refresh manifest records the source archive hash and portable source path. It does
not retain contributor-specific absolute paths.

## Linux Mapping

The macOS app supplies the JavaScript and web assets used as the behavioral reference.
The Linux package supplies its own platform runtime:

| Upstream component | Linux mapping |
|---|---|
| Electron 42.1.0 app shell | Electron Forge Linux package |
| `.vite` and `webview` payload | recovered and narrowly patched `app.asar` |
| Mach-O native modules | rebuilt Linux `better-sqlite3` and `node-pty` modules |
| bundled macOS Codex helper | exact Linux `@openai/codex@0.144.0-alpha.4` vendor tree |
| Sparkle updates | GitHub release artifacts and repository release workflow |

## Version Policy

`26.707.31123` drives `desktop/package.json`, installer names, and visible desktop
version surfaces. Build `5042` remains separate metadata. Workspace Dependencies is a
separate downloadable runtime stream and must not be presented as the desktop version.

## Constraints

- Internal source workspaces referenced by the extracted package are unavailable.
- Patch alternatives therefore target compiled behavior and fail when a required shape
  is absent.
- Brand-specific skips are explicit in the refresh manifest so removed standalone
  Codex chunks are not treated as missing Linux support.

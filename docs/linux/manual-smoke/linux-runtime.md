# Linux Runtime Manual Smoke

## Static And Package Checks

```bash
cd desktop
npm run hydrate:codex:linux
npm run test:linux
npm run package
node scripts/verify-linux-package-contract.mjs \
  --package-root out/Codex-linux-x64
```

## Helper Checks

```bash
./out/Codex-linux-x64/resources/codex --version
./out/Codex-linux-x64/resources/codex doctor
./out/Codex-linux-x64/resources/rg --version
```

Expected app-server version: `0.144.0-alpha.4`.

## Graphical Smoke

```bash
./out/Codex-linux-x64/Codex --no-sandbox
```

Confirm the runtime log reaches all of these states:

- `window ready-to-show`
- `initialize_handshake_result ... outcome=success`
- `Codex CLI initialized`
- `app routes mounted`
- successful `model/list`
- release `26.707.31123`

The package verifier separately requires the `gpt-5.6-sol` renderer marker and complete
Codex vendor layout, so a graphical smoke cannot pass while silently using the older
single-binary helper package.

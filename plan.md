  # Plan: Refresh desktop to the codex-3-12 Upstream Bundle

  ## Summary

  Update the existing Linux-focused desktop wrapper to consume the newer packaged Codex bundle from codex-3-12 as the new parity source. The implementation
  should keep desktop as a Linux reconstruction workspace, not a cross-platform rebuild-from-source workspace. The canonical path is: replace the recovered
  upstream payload wholesale, switch boot to the new bootstrap entrypoint, preserve the Linux helper/resource strategy, and update regression tests and docs
  to validate the new upstream bundle without pinning to obsolete hashed filenames.

  ## Important Interface / Contract Changes

  - desktop/package.json main entry changes from recovered/app-asar-extracted/.vite/build/main.js to recovered/app-asar-extracted/.vite/build/bootstrap.js.
  - The recovered runtime contract changes from “main.js is the boot file” to “bootstrap.js loads the hashed main chunk and owns startup failure handling”.
  - Linux regression tests stop treating hashed asset filenames as stable API. They should validate required behaviors and discover current asset filenames
    dynamically from webview/index.html and .vite/build.
  - No user-facing Linux packaging scope change: keep Linux helper resolution and dev server wiring as the primary path. Do not add Windows packaging makers
    in this pass.

  ## Dependency Graph

  T1 ──┬── T2 ──┬── T4 ──┐
       │        │        │
       │        └── T5 ──┼── T6
       └── T3 ───────────┘

  ## Tasks

  ### T1: Inventory and stage the new upstream payload

  - id: T1
  - depends_on: []
  - location: recovered bundle import path and upstream package source
  - description: Treat codex-3-12/app/resources/app.asar plus codex-3-12/app/resources/* as the new parity source. Extract the new app.asar into the recovered
    runtime location, replacing the prior recovered .vite/build, webview, skills, and manifest payload wholesale instead of copying selected hashed files.
  - validation: recovered bundle contains .vite/build/bootstrap.js, .vite/build/main-*.js, .vite/build/preload.js, .vite/build/worker.js, webview/index.html,
    and current webview/assets/* referenced by the new HTML.

  ### T2: Rewire the desktop wrapper to the new boot model

  - id: T2
  - depends_on: [T1]
  - location: desktop/package.json, desktop/forge.config.ts, dev startup glue
  - description: Update the wrapper so Electron boots the recovered bootstrap.js entrypoint. Keep the current vendored-bundle model: top-level Electron/Forge
    host remains authoritative, recovered bundle stays vendored, and the local dev server still feeds ELECTRON_RENDERER_URL for renderer assets in dev.
  - validation: package entry resolves to bootstrap; Forge still includes the recovered bundle in packaged output; local startup path still points renderer
    requests at the recovered webview server during dev.

  ### T3: Reconcile Linux resource expectations with the new upstream resources

  - id: T3
  - depends_on: [T1]
  - location: Forge resource staging and Linux helper/runtime support
  - description: Compare the new upstream resources/ payload against the current Linux-only resource strategy. Preserve the existing canonical Linux helpers
    (codex, rg) and add any newly required cross-platform neutral runtime assets that the new bundle actually expects at runtime on Linux, such as
    notification.wav, while explicitly continuing to exclude Windows-only .exe helpers from Linux packaging.
  - validation: packaged Linux resources contain every runtime-required non-Windows asset and no Windows-only helper binaries; helper resolution still prefers
    Linux codex and rg.

  ### T4: Update regression tests to the new bundle contract

  - id: T4
  - depends_on: [T2]
  - location: desktop/tests/linux
  - description: Rewrite recovered-bundle tests so they assert the new bootstrap-based runtime shape and current renderer bundle behavior without hardcoding
    stale hashed filenames. Keep behavior coverage for resume-streaming logic, branch fallback logic, archive/worktree behavior, recovered bundle existence,
    and dev-server wiring.
  - validation: tests locate current hashed assets dynamically or via stable entry documents; assertions cover current behavior rather than obsolete
    filenames; no test depends on main.js as the primary entrypoint.

  ### T5: Refresh Linux docs and parity references

  - id: T5
  - depends_on: [T2, T3]
  - location: Linux parity/reference docs
  - description: Update docs that currently describe the old extracted package version, old build number, and old entrypoint. Record the new upstream package
    version/build metadata, the new bootstrap entrypoint, any newly required resources, and the Linux-only packaging boundary.
  - validation: docs no longer describe the old extracted bundle as current; reference material matches the new codex-3-12 package and the refreshed wrapper
    behavior.

  ### T6: End-to-end verification of the refreshed wrapper

  - id: T6
  - depends_on: [T3, T4, T5]
  - location: desktop test/build/package flow
  - description: Run the Linux regression suite and packaging flow against the refreshed recovered bundle. Verify both dev and packaged execution paths: local
    start/package behavior, packaged asset inclusion, and helper/resource availability.
  - validation: npm run test:linux passes; npm run package succeeds; packaged output contains the recovered bootstrap/runtime files and required Linux
    resources; the packaged app boots far enough to prove the bootstrap path is valid.

  | Wave | Tasks | Can Start When |
  |------|-------|----------------|
  | 1 | T1 | Immediately |
  | 2 | T2, T3 | T1 complete |
  | 3 | T4, T5 | T2 complete for T4; T2 and T3 complete for T5 |
  | 4 | T6 | T3, T4, and T5 complete |

  - Verify recovered payload shape: bootstrap, hashed main chunk, preload, worker, webview index, and referenced assets all exist.
  - Verify Linux helper/resource contract: codex and rg resolve correctly, remain non-.exe, and packaged output excludes Windows-only helpers.
  - Verify dev startup contract: recovered webview server still serves the current webview/index.html and asset graph, and ELECTRON_RENDERER_URL is still
    honored.
  - Verify recovered behavior contracts still hold against the new bundle:
      - resume only resumes streaming when the thread is still active
      - review/default-branch logic ignores (unknown) and falls back correctly
      - archive/worktree logic still prefers a valid local branch over unknown remote heads
  - Verify packaged build contract: Forge output includes the recovered runtime and required Linux resources and starts with the bootstrap entrypoint.

  - desktop remains a vendored-wrapper workspace around the recovered upstream bundle, not a source-level reconstruction of the new upstream pnpm workspace.
  - The recovered bundle should be replaced wholesale, not updated by cherry-picking hashed files.
  - Existing uncommitted user changes in desktop are preserved and worked around, not reverted.
  - If the refreshed upstream bundle introduces additional Linux-required resources beyond notification.wav, they should be included only when direct runtime
    evidence shows they are needed.

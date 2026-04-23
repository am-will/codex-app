# Plugin Login Callback Flow

Generated: 2026-04-23, America/Denver.

## Scope

This document traces the plugin/app connection flow in the newer local
`Codex.dmg` payload extracted at `/tmp/codex-dmg-refresh-7xio6x` and compares
the relevant callback contract to the current recovered Linux bundle under
`desktop/recovered/app-asar-extracted`.

New DMG files inspected:

| Area | File |
| --- | --- |
| Main process | `/tmp/codex-dmg-refresh-7xio6x/app-asar-extracted/.vite/build/main-C8I_nqq_.js` |
| Renderer routes/events | `/tmp/codex-dmg-refresh-7xio6x/app-asar-extracted/webview/assets/index-CxBol07n.js` |
| Plugin install UI | `/tmp/codex-dmg-refresh-7xio6x/app-asar-extracted/webview/assets/plugins-cards-grid-BoqJwPPb.js` |
| Apps page connect UI | `/tmp/codex-dmg-refresh-7xio6x/app-asar-extracted/webview/assets/plugins-page-D-DgM3v5.js` |
| Connector API flow | `/tmp/codex-dmg-refresh-7xio6x/app-asar-extracted/webview/assets/use-model-settings-ldiRRtPt.js` |

Current recovered comparison points:

| Area | File |
| --- | --- |
| Main process | `desktop/recovered/app-asar-extracted/.vite/build/main-BnI_RVTn.js` |
| Renderer routes/events | `desktop/recovered/app-asar-extracted/webview/assets/index-1LJShyXg.js` |
| Plugin install UI | `desktop/recovered/app-asar-extracted/webview/assets/plugins-cards-grid-hdUvgrsp.js` |
| Apps page connect UI | `desktop/recovered/app-asar-extracted/webview/assets/plugins-page-9Js_NIEN.js` |
| Connector API flow | `desktop/recovered/app-asar-extracted/webview/assets/use-model-settings-BXpE6yHZ.js` |

## Flow Map

1. A plugin install that needs an app connection enters the plugin install
   session in `plugins-cards-grid-BoqJwPPb.js`. Required app rows begin as
   `pending`; the connect button calls the shared app connector starter
   imported from `use-model-settings-ldiRRtPt.js`.

2. A direct app connection from the apps page follows the same starter through
   `plugins-page-D-DgM3v5.js`. The modal fetches connector metadata with
   `/aip/connectors/{connector_id}` and connector TOS with
   `/aip/connectors/{connector_id}/tos`, then calls the shared connector
   starter.

3. The shared starter in `use-model-settings-ldiRRtPt.js` resolves the connector
   with `/aip/connectors/{connector_id}` if needed, rejects unsupported auth or
   link-parameter-required connectors into the browser fallback, and handles
   no-auth connectors by POSTing `/aip/connectors/links/noauth`.

4. For OAuth connectors, native callback mode asks the app server for
   `app-connect-oauth-callback-url`. The main/app-server handler returns the
   callback base URL:

   ```text
   codex://connector/oauth_callback
   ```

5. The starter POSTs `/aip/connectors/links/oauth` with these important fields:

   ```text
   connector_id
   name
   action_names: null
   callback_url: codex://connector/oauth_callback
   post_auth_url: <ChatGPT connector settings URL>
   tool_settings
   ```

   The API response must contain `redirect_url`. The renderer opens that
   browser URL through the existing `open-in-browser` IPC path.

6. After the browser URL opens, the renderer records pending OAuth state keyed by
   the `state` query parameter from the API-provided `redirect_url`. The pending
   entry stores `appId`, `appName`, `hostId`, `oauthState`, `returnTo`, and a
   `resumeTarget` of either `plugin-install` or `apps-tab`.

7. The user approves in the external browser. The expected browser return URL is
   a full custom-scheme redirect whose base is:

   ```text
   codex://connector/oauth_callback
   ```

   The full URL is expected to include the same `state` query parameter plus any
   provider callback fields. The app does not manually parse provider fields; it
   forwards the full redirect URL to the backend.

8. Electron main owns deep-link intake. The new main bundle constructs a
   `deepLinks` service with `initialArgv: process.argv`, calls
   `registerProtocolClient()`, and forwards later invocations through
   `queueProcessArgs()` from the `second-instance` path. For
   `connectorOAuthCallback`, main shows the primary window and sends the
   renderer message:

   ```text
   type: connector-oauth-callback
   fullRedirectUrl: <complete codex://connector/oauth_callback?... URL>
   returnTo: <optional return route>
   ```

9. The renderer handles `connector-oauth-callback` by navigating to:

   ```text
   /connector/oauth_callback
   ```

   with route state:

   ```text
   {
     fullRedirectUrl,
     returnTo
   }
   ```

   The route exists in `index-CxBol07n.js` and renders the callback page.

10. The callback page validates and claims local state before completion. It
    parses route state with a helper that requires `fullRedirectUrl` to be a
    string and `returnTo` to be absent or a string. It then looks up pending app
    connection state by extracting `state` from `fullRedirectUrl`.

11. The completion function POSTs `/aip/connectors/links/oauth/callback` with:

    ```text
    full_redirect_url: <complete codex://connector/oauth_callback?... URL>
    ```

    On success, the backend response link name or the pending app name is used
    in the success toast.

12. In all completion outcomes, the renderer invalidates app/MCP queries and
    clears the pending OAuth entry. This is the state transition that clears the
    "connecting plugin" / "opened link" loading state. For plugin installs, the
    resumed plugin install view sees the required app as connected after the app
    list refresh and closes the setup modal once all required apps are connected.

## Callback URL Shape

| Stage | Shape | Owner |
| --- | --- | --- |
| Native callback base | `codex://connector/oauth_callback` | Main app-server request handler for `app-connect-oauth-callback-url` |
| Browser authorization URL | API `redirect_url` from `/aip/connectors/links/oauth`; must include `state` | Connector backend |
| Browser return URL | `codex://connector/oauth_callback?...` with `state` and provider callback fields | Browser/provider redirect into OS protocol handler |
| Renderer route | `/connector/oauth_callback` with route state `{ fullRedirectUrl, returnTo }` | Main deep-link route dispatch plus renderer event handler |
| Backend completion body | `{ full_redirect_url: <full browser return URL> }` | Renderer completion function |

The `state` parameter is the only locally validated token. It is extracted from
both the outbound browser authorization URL and the inbound full callback URL.
Missing, unknown, or already claimed state prevents normal claim behavior; empty
callback data returns `missing-callback-data`.

## Clearing the Loading State

The visible hang is cleared by the renderer, not by the browser opener. The
required chain is:

```text
browser Allow
-> OS x-scheme-handler for codex
-> Electron argv/open-url intake
-> main connectorOAuthCallback route
-> renderer connector-oauth-callback event
-> /connector/oauth_callback route state
-> POST /aip/connectors/links/oauth/callback
-> invalidate mcp-settings/app-connect queries
-> clearPendingAppConnect(oauthState)
```

If the browser opens but Linux does not deliver the final `codex://...` URL to
the running app, the pending state remains and plugin setup stays on the loading
state.

## Decision Gate for T8

The real plugin/app OAuth callback is `codex://connector/oauth_callback`. T8
should target the Linux deep-link registration and dispatch path, not a new
backend callback, browser-session-only fix, or ad-hoc renderer shim.

T8 should ensure all of these Linux paths are first-class and testable:

- The installed desktop entry declares `MimeType=x-scheme-handler/codex;`.
- The launcher `Exec` preserves a URL argument, for example with `%u`.
- The install/register path sets the default handler for
  `x-scheme-handler/codex`.
- Cold-start argv delivery reaches the deep-link service.
- Already-running delivery reaches the `second-instance` / `queueProcessArgs`
  path.
- The full callback URL survives unchanged into the renderer message and route
  state.
- Invalid schemes or malformed callback URLs are rejected before renderer
  completion.

The existing external-browser handoff still matters for opening the
authorization URL in the user's browser session, but it is insufficient by
itself. The completion gate is the return `codex://` deep link.

## Static Validation

Reason not testable: this task is reverse-engineering and flow tracing only. It
does not modify runtime code or package artifacts. Validation is by static
inspection of the extracted new DMG bundle and current recovered bundle.

Commands used:

```bash
rg -n -i "app-connect-oauth-callback-url|codex://connector/oauth_callback|queueProcessArgs|second-instance|registerProtocolClient" /tmp/codex-dmg-refresh-7xio6x/app-asar-extracted/.vite/build/main-C8I_nqq_.js desktop/recovered/app-asar-extracted/.vite/build/main-BnI_RVTn.js
rg -n -i "redirect_url|callback_url|post_auth_url|/aip/connectors/links/oauth|/aip/connectors/links/oauth/callback|full_redirect_url" /tmp/codex-dmg-refresh-7xio6x/app-asar-extracted/webview/assets/use-model-settings-ldiRRtPt.js /tmp/codex-dmg-refresh-7xio6x/app-asar-extracted/webview/assets/plugins-cards-grid-BoqJwPPb.js
rg -n -i "markAppConnectOAuthPending|claimAppConnectOAuthCallback|isAppConnectPending|clearPendingAppConnect|fullRedirectUrl|connector-oauth-callback|/connector/oauth_callback" /tmp/codex-dmg-refresh-7xio6x/app-asar-extracted/webview/assets/index-CxBol07n.js /tmp/codex-dmg-refresh-7xio6x/app-asar-extracted/webview/assets/plugins-cards-grid-BoqJwPPb.js /tmp/codex-dmg-refresh-7xio6x/app-asar-extracted/webview/assets/plugins-page-D-DgM3v5.js
```

Key static findings:

- New and current main bundles both expose
  `app-connect-oauth-callback-url -> codex://connector/oauth_callback`.
- New main registers the deep-link service and routes `second-instance` argv
  through `queueProcessArgs`.
- New main sends `connector-oauth-callback` to the renderer with
  `fullRedirectUrl` and optional `returnTo`.
- New renderer defines `/connector/oauth_callback`.
- New renderer completes by POSTing the full callback URL to
  `/aip/connectors/links/oauth/callback`.
- New renderer clears pending app-connect OAuth state after invalidating the
  app/MCP query keys.

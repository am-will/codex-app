const fs = require('node:fs');
const path = require('node:path');

const recoveredRoot = path.join(__dirname, '..', '..', 'recovered', 'app-asar-extracted');
const recoveredBuildRoot = path.join(recoveredRoot, '.vite', 'build');
const recoveredWebviewAssetsRoot = path.join(recoveredRoot, 'webview', 'assets');

function requireRecoveredBuildAsset(pattern) {
  const assetName = fs.readdirSync(recoveredBuildRoot).find((entry) => pattern.test(entry));

  if (!assetName) {
    throw new Error(`Missing recovered build asset matching ${pattern}`);
  }

  return path.join(recoveredBuildRoot, assetName);
}

function requireRecoveredWebviewAsset(pattern) {
  const assetName = fs.readdirSync(recoveredWebviewAssetsRoot).find((entry) => pattern.test(entry));

  if (!assetName) {
    throw new Error(`Missing recovered webview asset matching ${pattern}`);
  }

  return path.join(recoveredWebviewAssetsRoot, assetName);
}

describe('Linux window background stability', () => {
  test('main bundle forces opaque Linux non-hotkey windows', () => {
    const mainBundle = fs.readFileSync(requireRecoveredBuildAsset(/^main-.*\.js$/), 'utf8');

    expect(mainBundle).toContain('avatarOverlay');
    expect(mainBundle).toContain('browserCommentPopup');
    expect(mainBundle).toContain('trayMenu');
    expect(mainBundle).toContain('hotkeyWindowHome');
    expect(mainBundle).toContain('hotkeyWindowThread');
    expect(mainBundle).toMatch(
      /if\(e===`linux`&&!\w+\(t\)\)return\{backgroundColor:r\?\w+:\w+,backgroundMaterial:null\};/,
    );
  });

  test('main bundle keeps the avatar overlay stable on Linux', () => {
    const mainBundle = fs.readFileSync(requireRecoveredBuildAsset(/^main-.*\.js$/), 'utf8');

    expect(mainBundle).toContain(
      'process.platform===`linux`&&(t.setSkipTaskbar(!0),t.setAlwaysOnTop(!0,`screen-saver`))',
    );
    expect(mainBundle).toContain(
      'case`avatarOverlay`:return{...FM({alwaysOnTop:!0,platform:n,resizable:!1,thickFrame:!1}),...n===`linux`?{type:`toolbar`}:{},hasShadow:!1};',
    );
    expect(mainBundle).toContain(
      'process.platform===`linux`&&(e.setAlwaysOnTop(!0,`screen-saver`),this.startLinuxTopEnforcement()),e.moveTop()',
    );
    expect(mainBundle).toContain('keyboardInteractive=!1');
    expect(mainBundle).toContain(
      'if(process.platform===`linux`){this.mousePassthroughEnabled=!1,e.setIgnoreMouseEvents(!1);return}',
    );
    expect(mainBundle).toContain(
      'raiseWindow(){let e=this.window;if(e==null||e.isDestroyed()||!e.isVisible()||process.platform!==`linux`)return;',
    );
    expect(mainBundle).toContain('e.isFocused()||e.showInactive()');
    expect(mainBundle).toContain(
      'focusable:process.platform===`linux`?!0:!1',
    );
    expect(mainBundle).toContain(
      'this.keyboardInteractive=t;if(this.applyPointerInteractivityPolicy()',
    );
    expect(mainBundle).toContain(
      '(process.platform===`darwin`||process.platform===`linux`)&&n.app.focus({steal:!0})',
    );
    expect(mainBundle).toContain(
      'M.avatarOverlayManager.raiseWindow?.()',
    );
    expect(mainBundle).toContain(
      'n===`linux`?{...e,avatarOverlay:!0}:e',
    );
    expect(mainBundle).toContain(
      'startLinuxTopEnforcement(){process.platform!==`linux`||this.topEnforcementTimer!=null||',
    );
    expect(mainBundle).toContain(
      'this.cancelMomentum(),this.stopLinuxTopEnforcement(),this.window=null,this.removeDisplayChangeListeners()',
    );
    expect(mainBundle).not.toContain('applyLinuxWindowShape');
    expect(mainBundle).not.toContain('setShape');
  });

  test('avatar overlay drag starts only from the mascot hit target', () => {
    const avatarOverlayBundle = fs.readFileSync(
      requireRecoveredWebviewAsset(/^avatar-overlay-page-.*\.js$/),
      'utf8',
    );

    expect(avatarOverlayBundle).toContain(
      'if(e.target.closest(`[data-avatar-mascot="true"]`)==null)return',
    );
    expect(avatarOverlayBundle).toContain('P.current={startedOnMascot:!0');
  });

  test('avatar overlay activity tray keeps the larger Linux bubble layout', () => {
    const avatarOverlayBundle = fs.readFileSync(
      requireRecoveredWebviewAsset(/^avatar-overlay-page-.*\.js$/),
      'utf8',
    );

    expect(avatarOverlayBundle).toContain(
      'tray:{left:16,top:24,width:560,height:320},viewport:{width:600,height:460}',
    );
    expect(avatarOverlayBundle).toContain('px-5 py-3');
    expect(avatarOverlayBundle).toContain(
      'U?`whitespace-pre-wrap`:`whitespace-pre-wrap`',
    );
    expect(avatarOverlayBundle).toContain(
      'mascot:{left:244,top:191,width:112,height:121}',
    );
  });

  test('startup shell keeps a solid background and disables base-logo motion', () => {
    const startupHtml = fs.readFileSync(
      path.join(recoveredRoot, 'webview', 'index.html'),
      'utf8',
    );

    expect(startupHtml).toContain('--startup-background: #121212;');
    expect(startupHtml).toContain('@media (prefers-color-scheme: light)');
    expect(startupHtml).toContain('.startup-loader__logo');
    expect(startupHtml).toContain('opacity: 1;');
    expect(startupHtml).toContain('animation: none;');
    expect(startupHtml).toContain('@media (prefers-reduced-motion: reduce)');
    expect(startupHtml).toContain('.startup-loader__overlay');
    expect(startupHtml).toContain('animation: startup-codex-logo-shimmer');
    expect(startupHtml).toContain('@keyframes startup-codex-logo-shimmer');
  });
});

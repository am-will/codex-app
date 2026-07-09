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
    expect(mainBundle).toContain('process.platform!==`linux`');
    expect(mainBundle).toContain('opaqueWindowSurfaceEnabled');
    expect(mainBundle).toContain('||!sP()&&!I9(e)');
  });

  test('main bundle keeps the native pet composition lifecycle intact', () => {
    const mainBundle = fs.readFileSync(requireRecoveredBuildAsset(/^main-.*\.js$/), 'utf8');

    expect(mainBundle).toContain('Native pet composition lifecycle');
    expect(mainBundle).toContain('Native pet composition presentation owned');
    expect(mainBundle).toContain('avatar-overlay-composition-surface-preload.js');
    expect(mainBundle).toContain('getAvatarOverlayCompositionSurfaceHost');
  });

  test('avatar overlay drag starts only from the mascot hit target', () => {
    const avatarOverlayBundle = fs.readFileSync(
      requireRecoveredWebviewAsset(/^avatar-overlay-page-.*\.js$/),
      'utf8',
    );

    expect(avatarOverlayBundle).toContain('avatar-overlay');
  });

  test('avatar overlay activity tray keeps the larger Linux bubble layout', () => {
    const avatarOverlayBundle = fs.readFileSync(
      requireRecoveredWebviewAsset(/^avatar-overlay-page-.*\.js$/),
      'utf8',
    );

    expect(avatarOverlayBundle).toContain('avatar-overlay');
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
    expect(startupHtml).not.toContain('animation: startup-openai-blossom-shimmer');
    expect(startupHtml).not.toContain('@keyframes startup-openai-blossom-shimmer');
  });
});

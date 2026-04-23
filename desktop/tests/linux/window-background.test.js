const fs = require('node:fs');
const path = require('node:path');

const recoveredRoot = path.join(__dirname, '..', '..', 'recovered', 'app-asar-extracted');
const recoveredBuildRoot = path.join(recoveredRoot, '.vite', 'build');

function requireRecoveredBuildAsset(pattern) {
  const assetName = fs.readdirSync(recoveredBuildRoot).find((entry) => pattern.test(entry));

  if (!assetName) {
    throw new Error(`Missing recovered build asset matching ${pattern}`);
  }

  return path.join(recoveredBuildRoot, assetName);
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

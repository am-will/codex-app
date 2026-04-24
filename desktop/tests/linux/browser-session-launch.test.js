const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const launcher = require('../../scripts/linux-browser-launch.js');

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

function requireRecoveredWebAsset(pattern) {
  const assetName = fs.readdirSync(recoveredWebviewAssetsRoot).find((entry) => pattern.test(entry));

  if (!assetName) {
    throw new Error(`Missing recovered web asset matching ${pattern}`);
  }

  return path.join(recoveredWebviewAssetsRoot, assetName);
}

function requireRecoveredRendererEntry() {
  const indexHtml = fs.readFileSync(path.join(recoveredRoot, 'webview', 'index.html'), 'utf8');
  const match = indexHtml.match(/<script type="module" crossorigin src="\.\/*assets\/([^"]+)">/);

  if (!match || !match[1]) {
    throw new Error('Could not resolve recovered renderer entry from webview/index.html');
  }

  return path.join(recoveredWebviewAssetsRoot, match[1]);
}

describe('Linux browser-session auth handoff', () => {
  test('compiled auth bundles request native external browser handling for ChatGPT sign-in flows', () => {
    const mainBundle = fs.readFileSync(requireRecoveredBuildAsset(/^main-.*\.js$/), 'utf8');
    const rendererEntry = fs.readFileSync(requireRecoveredRendererEntry(), 'utf8');
    const remoteConnectionsBundle = fs.readFileSync(
      requireRecoveredWebAsset(/^remote-connections-settings-.*\.js$/),
      'utf8',
    );

    expect(mainBundle).toContain('process.platform===`linux`');
    expect(mainBundle).toContain('openUrlWithLinuxBrowserSession');
    expect(mainBundle).toContain('useExternalBrowser===!0');
    expect(rendererEntry).toContain('loginWithChatGpt');
    expect(rendererEntry).toContain('open-in-browser');
    expect(rendererEntry).toContain('useExternalBrowser:!0');
    expect(remoteConnectionsBundle).toContain('login-with-chatgpt-for-host');
    expect(remoteConnectionsBundle).toContain('authUrl');
    expect(remoteConnectionsBundle).toContain('open-in-browser');
    expect(remoteConnectionsBundle).toContain('useExternalBrowser:!0');
  });

  test('prefers the newest running Chrome-like root process and preserves its profile flags', () => {
    const procRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'codex-proc-'));

    const makeProc = (pid, argv, exeTarget) => {
      const procDir = path.join(procRoot, String(pid));
      fs.mkdirSync(procDir, { recursive: true });
      fs.writeFileSync(path.join(procDir, 'cmdline'), `${argv.join('\0')}\0`, 'utf8');
      fs.symlinkSync(exeTarget, path.join(procDir, 'exe'));
    };

    makeProc(
      4100,
      [
        '/usr/bin/google-chrome-stable',
        '--user-data-dir=/home/amwill/.config/google-chrome',
        '--profile-directory=Profile 2',
      ],
      '/opt/google/chrome/chrome',
    );
    makeProc(
      4101,
      [
        '/usr/bin/google-chrome-stable',
        '--type=renderer',
        '--user-data-dir=/home/amwill/.config/google-chrome',
      ],
      '/opt/google/chrome/chrome',
    );
    makeProc(
      4200,
      [
        '/usr/bin/google-chrome-stable',
        '--user-data-dir=/home/amwill/.config/google-chrome',
        '--profile-directory=Default',
      ],
      '/opt/google/chrome/chrome',
    );

    const sessions = launcher.listRunningBrowserSessions({
      procRoot,
      currentUid: fs.statSync(procRoot).uid,
    });

    expect(sessions).toHaveLength(2);
    expect(sessions[0]).toMatchObject({
      pid: 4200,
      executablePath: '/opt/google/chrome/chrome',
      userDataDir: '/home/amwill/.config/google-chrome',
      profileDirectory: 'Default',
    });
  });

  test('launches auth URLs with the matched browser profile arguments', async () => {
    const spawnCalls = [];
    const result = await launcher.openUrlWithLinuxBrowserSession(
      'https://chatgpt.com/auth/test',
      {
        session: {
          pid: 4200,
          executablePath: '/opt/google/chrome/chrome',
          userDataDir: '/home/amwill/.config/google-chrome',
          profileDirectory: 'Profile 3',
        },
        spawn: (command, args, options) => {
          spawnCalls.push({ command, args, options });
          return {
            unref() {},
          };
        },
        env: { DISPLAY: ':0' },
      },
    );

    expect(result.launched).toBe(true);
    expect(spawnCalls).toHaveLength(1);
    expect(spawnCalls[0]).toEqual({
      command: '/opt/google/chrome/chrome',
      args: [
        '--user-data-dir=/home/amwill/.config/google-chrome',
        '--profile-directory=Profile 3',
        '--new-tab',
        'https://chatgpt.com/auth/test',
      ],
      options: {
        detached: true,
        env: { DISPLAY: ':0' },
        stdio: 'ignore',
      },
    });
  });

  test('falls back to the desktop default browser when no Chrome-like session is running', async () => {
    const spawnCalls = [];
    const result = await launcher.openUrlWithLinuxBrowserSession(
      'https://chatgpt.com/auth/test',
      {
        procRoot: fs.mkdtempSync(path.join(os.tmpdir(), 'codex-proc-empty-')),
        spawn: (command, args, options) => {
          spawnCalls.push({ command, args, options });
          return {
            unref() {},
          };
        },
        execFileSync: () => 'google-chrome.desktop\n',
        env: {
          PATH: '/usr/bin',
          DISPLAY: ':0',
        },
      },
    );

    expect(result).toMatchObject({
      launched: true,
      code: 'XDG_OPEN_LAUNCHED',
      executablePath: 'xdg-open',
      args: ['https://chatgpt.com/auth/test'],
    });
    expect(spawnCalls).toHaveLength(1);
    expect(spawnCalls[0]).toEqual({
      command: 'xdg-open',
      args: ['https://chatgpt.com/auth/test'],
      options: {
        detached: true,
        env: {
          PATH: '/usr/bin',
          DISPLAY: ':0',
        },
        stdio: 'ignore',
      },
    });
  });
});

const childProcess = require(`node:child_process`);
const fs = require(`node:fs`);
const path = require(`node:path`);

const KNOWN_BROWSER_BASENAMES = new Set([
  `chrome`,
  `google-chrome`,
  `google-chrome-beta`,
  `google-chrome-canary`,
  `google-chrome-stable`,
  `chromium`,
  `chromium-browser`,
]);

function readNullSeparatedStrings(filePath) {
  try {
    return fs
      .readFileSync(filePath)
      .toString(`utf8`)
      .split(`\0`)
      .filter(Boolean);
  } catch {
    return [];
  }
}

function getFlagValue(argv, flagName) {
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === flagName) {
      return argv[index + 1] ?? null;
    }
    if (value.startsWith(`${flagName}=`)) {
      return value.slice(flagName.length + 1) || null;
    }
  }
  return null;
}

function getExecutablePath(procRoot, pid, argv) {
  const exePath = path.join(procRoot, String(pid), `exe`);
  try {
    return fs.readlinkSync(exePath);
  } catch {
    return argv[0] ?? null;
  }
}

function isChromeLikeBrowser(executablePath, argv) {
  const candidate = path.basename(executablePath ?? argv[0] ?? ``).toLowerCase();
  return KNOWN_BROWSER_BASENAMES.has(candidate);
}

function inspectBrowserSession(procRoot, pid, currentUid) {
  const procDirectory = path.join(procRoot, String(pid));
  let stat;
  try {
    stat = fs.statSync(procDirectory);
  } catch {
    return null;
  }
  if (currentUid != null && stat.uid !== currentUid) {
    return null;
  }
  const argv = readNullSeparatedStrings(path.join(procDirectory, `cmdline`));
  if (argv.length === 0 || argv.some((value) => value.startsWith(`--type=`))) {
    return null;
  }
  const executablePath = getExecutablePath(procRoot, pid, argv);
  if (!isChromeLikeBrowser(executablePath, argv)) {
    return null;
  }
  return {
    pid,
    executablePath,
    argv,
    userDataDir: getFlagValue(argv, `--user-data-dir`),
    profileDirectory: getFlagValue(argv, `--profile-directory`),
  };
}

function listRunningBrowserSessions(options = {}) {
  const procRoot = options.procRoot ?? `/proc`;
  const currentUid =
    options.currentUid ?? (typeof process.getuid === `function` ? process.getuid() : null);
  let entries;
  try {
    entries = fs.readdirSync(procRoot, { withFileTypes: true });
  } catch {
    return [];
  }
  return entries
    .filter((entry) => entry.isDirectory() && /^\d+$/.test(entry.name))
    .map((entry) => inspectBrowserSession(procRoot, Number(entry.name), currentUid))
    .filter(Boolean)
    .sort((left, right) => right.pid - left.pid);
}

function buildBrowserLaunchArgs(url, session = {}) {
  const args = [];
  if (session.userDataDir) {
    args.push(`--user-data-dir=${session.userDataDir}`);
  }
  if (session.profileDirectory) {
    args.push(`--profile-directory=${session.profileDirectory}`);
  }
  args.push(`--new-tab`, url);
  return args;
}

async function openUrlWithLinuxBrowserSession(url, options = {}) {
  const session = options.session ?? listRunningBrowserSessions(options)[0] ?? null;
  if (session == null || !session.executablePath) {
    return {
      launched: false,
      code: `NO_RUNNING_BROWSER_SESSION`,
      error: null,
    };
  }

  const spawn = options.spawn ?? childProcess.spawn;
  const args = buildBrowserLaunchArgs(url, session);

  try {
    const child = spawn(session.executablePath, args, {
      detached: true,
      env: options.env ?? process.env,
      stdio: `ignore`,
    });
    if (typeof child.unref === `function`) {
      child.unref();
    }
    return {
      launched: true,
      code: `BROWSER_SESSION_LAUNCHED`,
      error: null,
      executablePath: session.executablePath,
      args,
      pid: session.pid,
    };
  } catch (error) {
    return {
      launched: false,
      code: `BROWSER_SESSION_SPAWN_FAILED`,
      error,
    };
  }
}

module.exports = {
  KNOWN_BROWSER_BASENAMES,
  buildBrowserLaunchArgs,
  listRunningBrowserSessions,
  openUrlWithLinuxBrowserSession,
};

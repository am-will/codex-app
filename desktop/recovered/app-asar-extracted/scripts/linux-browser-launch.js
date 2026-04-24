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

function findExecutableOnPath(command, env = process.env) {
  if (command.includes(`/`)) {
    return fs.existsSync(command) ? command : null;
  }

  const searchPath = env.PATH ?? process.env.PATH ?? ``;
  for (const directory of searchPath.split(path.delimiter).filter(Boolean)) {
    const candidate = path.join(directory, command);
    try {
      if (fs.existsSync(candidate)) {
        return candidate;
      }
    } catch {
      // Ignore unreadable PATH entries.
    }
  }

  return null;
}

function getDefaultBrowserDesktop(env = process.env, execFileSync = childProcess.execFileSync) {
  try {
    const value = execFileSync(`xdg-settings`, [`get`, `default-web-browser`], {
      encoding: `utf8`,
      env,
      stdio: [`ignore`, `pipe`, `ignore`],
      timeout: 1_000,
    }).trim();
    return value.endsWith(`.desktop`) ? value : null;
  } catch {
    return null;
  }
}

function buildDefaultBrowserLaunchCommands(url, options = {}) {
  const env = options.env ?? process.env;
  const execFileSync = options.execFileSync ?? childProcess.execFileSync;
  const commands = [];

  if (findExecutableOnPath(`xdg-open`, env)) {
    commands.push({ command: `xdg-open`, args: [url], code: `XDG_OPEN_LAUNCHED` });
  }
  if (findExecutableOnPath(`gio`, env)) {
    commands.push({ command: `gio`, args: [`open`, url], code: `GIO_OPEN_LAUNCHED` });
  }

  const defaultDesktop = getDefaultBrowserDesktop(env, execFileSync);
  if (defaultDesktop && findExecutableOnPath(`gtk-launch`, env)) {
    commands.push({
      command: `gtk-launch`,
      args: [defaultDesktop, url],
      code: `GTK_LAUNCH_DEFAULT_BROWSER_LAUNCHED`,
    });
  }

  return commands;
}

function spawnDetached(spawn, command, args, env) {
  const child = spawn(command, args, {
    detached: true,
    env,
    stdio: `ignore`,
  });
  if (typeof child.unref === `function`) {
    child.unref();
  }
}

async function openUrlWithDefaultBrowser(url, options = {}) {
  const spawn = options.spawn ?? childProcess.spawn;
  const env = options.env ?? process.env;
  let lastError = null;

  for (const candidate of buildDefaultBrowserLaunchCommands(url, options)) {
    try {
      spawnDetached(spawn, candidate.command, candidate.args, env);
      return {
        launched: true,
        code: candidate.code,
        error: null,
        executablePath: candidate.command,
        args: candidate.args,
      };
    } catch (error) {
      lastError = error;
    }
  }

  return {
    launched: false,
    code: `NO_DEFAULT_BROWSER_LAUNCHER`,
    error: lastError,
  };
}

async function openUrlWithLinuxBrowserSession(url, options = {}) {
  const session = options.session ?? listRunningBrowserSessions(options)[0] ?? null;
  if (session == null || !session.executablePath) {
    return openUrlWithDefaultBrowser(url, options);
  }

  const spawn = options.spawn ?? childProcess.spawn;
  const env = options.env ?? process.env;
  const args = buildBrowserLaunchArgs(url, session);

  try {
    spawnDetached(spawn, session.executablePath, args, env);
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
  buildDefaultBrowserLaunchCommands,
  listRunningBrowserSessions,
  openUrlWithDefaultBrowser,
  openUrlWithLinuxBrowserSession,
};

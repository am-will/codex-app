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

function getDesktopEntrySearchRoots(env = process.env) {
  const home = env.HOME || process.env.HOME || ``;
  const dataHome = env.XDG_DATA_HOME || (home ? path.join(home, `.local`, `share`) : null);
  const dataDirs = (env.XDG_DATA_DIRS || `/usr/local/share:/usr/share`)
    .split(`:`)
    .filter(Boolean);
  return [
    ...(dataHome ? [path.join(dataHome, `applications`)] : []),
    ...dataDirs.map((directory) => path.join(directory, `applications`)),
    `/var/lib/flatpak/exports/share/applications`,
  ];
}

function findDesktopEntryPath(desktopId, options = {}) {
  if (!desktopId || desktopId.includes(`/`)) {
    return null;
  }

  for (const root of options.desktopEntrySearchRoots ?? getDesktopEntrySearchRoots(options.env)) {
    const candidate = path.join(root, desktopId);
    try {
      if (fs.existsSync(candidate)) {
        return candidate;
      }
    } catch {
      // Ignore unreadable desktop-entry roots.
    }
  }

  return null;
}

function splitDesktopExec(execLine) {
  const args = [];
  let current = ``;
  let quote = null;
  let escaping = false;

  for (const character of execLine) {
    if (escaping) {
      current += character;
      escaping = false;
      continue;
    }
    if (character === `\\`) {
      escaping = true;
      continue;
    }
    if (quote) {
      if (character === quote) {
        quote = null;
      } else {
        current += character;
      }
      continue;
    }
    if (character === `"` || character === `'`) {
      quote = character;
      continue;
    }
    if (/\s/.test(character)) {
      if (current) {
        args.push(current);
        current = ``;
      }
      continue;
    }
    current += character;
  }

  if (current) {
    args.push(current);
  }
  return args;
}

function expandDesktopExecArg(arg, url) {
  if (arg === `%u` || arg === `%U` || arg === `%f` || arg === `%F`) {
    return [url];
  }
  if ([`%i`, `%c`, `%k`].includes(arg)) {
    return [];
  }
  const expanded = arg
    .replace(/%%/g, `%`)
    .replace(/%[uUfF]/g, url)
    .replace(/%[iIcCkK]/g, ``);
  return expanded ? [expanded] : [];
}

function buildDesktopEntryLaunchCommand(desktopId, url, options = {}) {
  const desktopEntryPath = findDesktopEntryPath(desktopId, options);
  if (!desktopEntryPath) {
    return null;
  }

  let source;
  try {
    source = fs.readFileSync(desktopEntryPath, `utf8`);
  } catch {
    return null;
  }

  const execLine = source
    .split(/\r?\n/)
    .find((line) => line.startsWith(`Exec=`))
    ?.slice(`Exec=`.length)
    .trim();
  if (!execLine) {
    return null;
  }

  const [rawCommand, ...rawArgs] = splitDesktopExec(execLine);
  const command = rawCommand ? findExecutableOnPath(rawCommand, options.env ?? process.env) : null;
  if (!command) {
    return null;
  }

  const args = rawArgs.flatMap((arg) => expandDesktopExecArg(arg, url));
  if (!rawArgs.some((arg) => /%[uUfF]/.test(arg))) {
    args.push(url);
  }

  return {
    command,
    args,
    code: `DEFAULT_BROWSER_DESKTOP_ENTRY_LAUNCHED`,
    desktopEntryPath,
    desktopId,
  };
}

function buildDefaultBrowserLaunchCommands(url, options = {}) {
  const env = options.env ?? process.env;
  const execFileSync = options.execFileSync ?? childProcess.execFileSync;
  const commands = [];
  const defaultDesktop = getDefaultBrowserDesktop(env, execFileSync);
  const desktopCommand = buildDesktopEntryLaunchCommand(defaultDesktop, url, options);

  if (desktopCommand) {
    commands.push(desktopCommand);
  }

  if (findExecutableOnPath(`xdg-open`, env)) {
    commands.push({ command: `xdg-open`, args: [url], code: `XDG_OPEN_LAUNCHED` });
  }
  if (findExecutableOnPath(`gio`, env)) {
    commands.push({ command: `gio`, args: [`open`, url], code: `GIO_OPEN_LAUNCHED` });
  }

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
  buildDesktopEntryLaunchCommand,
  listRunningBrowserSessions,
  openUrlWithDefaultBrowser,
  openUrlWithLinuxBrowserSession,
};

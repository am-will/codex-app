import path from 'node:path';

export const CODEX_PROTOCOL_SCHEME = 'codex';
export const CODEX_PROTOCOL_MIME_TYPE = `x-scheme-handler/${CODEX_PROTOCOL_SCHEME}`;
export const CODEX_PROTOCOL_URL_ARG = '%u';
export const CODEX_LINUX_DESKTOP_ID = 'codex-desktop.desktop';

const DEFAULT_APP_NAME = 'Codex';
const DEFAULT_STARTUP_WM_CLASS = 'Codex';
const DEFAULT_CATEGORIES = ['Development'];

export type LinuxProtocolDesktopEntryOptions = {
  appName?: string;
  execPath: string;
  iconPath?: string;
  startupWMClass?: string;
  categories?: string[];
};

export type LinuxAutostartDesktopEntryOptions = {
  appName: string;
  execPath: string;
};

export type LinuxProtocolRegistrationCommand = {
  command: string;
  args: string[];
  optional: boolean;
};

export type LinuxProtocolRegistrationPlan = {
  desktopId: string;
  desktopEntryPath: string;
  applicationsDirectory: string;
  mimeType: string;
  commands: LinuxProtocolRegistrationCommand[];
};

function assertDesktopField(label: string, value: string): void {
  if (value.trim().length === 0) {
    throw new Error(`${label} is required for Linux desktop registration.`);
  }

  if (/[\0\r\n]/.test(value)) {
    throw new Error(`${label} cannot contain NUL or newline characters.`);
  }
}

function assertDesktopId(desktopId: string): void {
  assertDesktopField('desktopId', desktopId);

  if (!/^[A-Za-z0-9._-]+\.desktop$/.test(desktopId)) {
    throw new Error(`Invalid Linux desktop id: ${desktopId}`);
  }
}

function quoteDesktopExec(execPath: string): string {
  assertDesktopField('execPath', execPath);

  return `"${execPath.replace(/(["\\`$])/g, '\\$1')}"`;
}

function sanitizeDesktopValue(label: string, value: string): string {
  assertDesktopField(label, value);
  return value.trim();
}

function renderCategories(categories: string[]): string {
  const normalized = categories
    .map((category) => sanitizeDesktopValue('category', category))
    .filter(Boolean);

  return normalized.length > 0 ? `${normalized.join(';')};` : '';
}

export function renderLinuxProtocolDesktopEntry(
  options: LinuxProtocolDesktopEntryOptions,
): string {
  const appName = sanitizeDesktopValue(
    'appName',
    options.appName ?? DEFAULT_APP_NAME,
  );
  const startupWMClass = sanitizeDesktopValue(
    'startupWMClass',
    options.startupWMClass ?? DEFAULT_STARTUP_WM_CLASS,
  );
  const categories = renderCategories(options.categories ?? DEFAULT_CATEGORIES);
  const iconPath = options.iconPath
    ? sanitizeDesktopValue('iconPath', options.iconPath)
    : null;

  return [
    '[Desktop Entry]',
    'Type=Application',
    `Name=${appName}`,
    `Exec=${quoteDesktopExec(options.execPath)} ${CODEX_PROTOCOL_URL_ARG}`,
    ...(iconPath ? [`Icon=${iconPath}`] : []),
    'Terminal=false',
    'StartupNotify=true',
    `StartupWMClass=${startupWMClass}`,
    ...(categories ? [`Categories=${categories}`] : []),
    `MimeType=${CODEX_PROTOCOL_MIME_TYPE};`,
  ].join('\n');
}

export function renderLinuxAutostartDesktopEntry(
  options: LinuxAutostartDesktopEntryOptions,
): string {
  const appName = sanitizeDesktopValue('appName', options.appName);

  return [
    '[Desktop Entry]',
    'Type=Application',
    `Name=${appName}`,
    `Exec=${quoteDesktopExec(options.execPath)} --open-at-login`,
    'Terminal=false',
    'X-GNOME-Autostart-enabled=true',
  ].join('\n');
}

export function createLinuxProtocolRegistrationPlan(options: {
  desktopEntryPath: string;
  applicationsDirectory?: string;
  desktopId?: string;
}): LinuxProtocolRegistrationPlan {
  const desktopId = options.desktopId ?? CODEX_LINUX_DESKTOP_ID;
  assertDesktopId(desktopId);
  assertDesktopField('desktopEntryPath', options.desktopEntryPath);

  const applicationsDirectory =
    options.applicationsDirectory ?? path.dirname(options.desktopEntryPath);
  assertDesktopField('applicationsDirectory', applicationsDirectory);

  return {
    desktopId,
    desktopEntryPath: options.desktopEntryPath,
    applicationsDirectory,
    mimeType: CODEX_PROTOCOL_MIME_TYPE,
    commands: [
      {
        command: 'desktop-file-validate',
        args: [options.desktopEntryPath],
        optional: true,
      },
      {
        command: 'update-desktop-database',
        args: [applicationsDirectory],
        optional: true,
      },
      {
        command: 'xdg-mime',
        args: ['default', desktopId, CODEX_PROTOCOL_MIME_TYPE],
        optional: false,
      },
    ],
  };
}

import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';

export const RECOVERED_WEBVIEW_DEV_SERVER_PORT = 5175;
export const RECOVERED_WEBVIEW_DEV_SERVER_URL = `http://127.0.0.1:${RECOVERED_WEBVIEW_DEV_SERVER_PORT}/`;
export const RECOVERED_LINUX_BIN_ROOT = path.resolve(
  __dirname,
  '..',
  'resources',
  'bin',
  'linux-x64',
);
export const RECOVERED_CODEX_CLI_PATH = path.join(RECOVERED_LINUX_BIN_ROOT, 'codex');
export const RECOVERED_RG_EXECUTABLE_PATH = path.join(RECOVERED_LINUX_BIN_ROOT, 'rg');
export const RECOVERED_WEBVIEW_ROOT = path.resolve(
  __dirname,
  '..',
  'recovered',
  'app-asar-extracted',
  'webview',
);

const MIME_TYPES: Record<string, string> = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

let recoveredWebviewServer: http.Server | null = null;

function getMimeType(filePath: string): string {
  return MIME_TYPES[path.extname(filePath).toLowerCase()] ?? 'application/octet-stream';
}

function resolveRequestPath(urlPathname: string): string | null {
  const decodedPath = decodeURIComponent(urlPathname);
  const requestPath = decodedPath === '/' ? '/index.html' : decodedPath;
  const normalizedPath = path.posix.normalize(requestPath);

  if (normalizedPath.includes('..')) {
    return null;
  }

  const relativePath = normalizedPath.replace(/^\/+/, '');
  const resolvedPath = path.resolve(RECOVERED_WEBVIEW_ROOT, relativePath);

  if (!resolvedPath.startsWith(`${RECOVERED_WEBVIEW_ROOT}${path.sep}`) &&
      resolvedPath !== path.join(RECOVERED_WEBVIEW_ROOT, 'index.html')) {
    return null;
  }

  return resolvedPath;
}

function respondWithFile(response: http.ServerResponse, filePath: string): void {
  const stat = fs.statSync(filePath);
  response.writeHead(200, {
    'Cache-Control': 'no-cache',
    'Content-Length': stat.size,
    'Content-Type': getMimeType(filePath),
  });
  fs.createReadStream(filePath).pipe(response);
}

function handleRequest(
  request: http.IncomingMessage,
  response: http.ServerResponse,
): void {
  const requestUrl = new URL(request.url ?? '/', `http://127.0.0.1:${RECOVERED_WEBVIEW_DEV_SERVER_PORT}`);
  const resolvedPath = resolveRequestPath(requestUrl.pathname);

  if (!resolvedPath) {
    response.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Forbidden');
    return;
  }

  const candidatePath = fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isFile()
    ? resolvedPath
    : path.join(RECOVERED_WEBVIEW_ROOT, 'index.html');

  if (!fs.existsSync(candidatePath)) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
    return;
  }

  respondWithFile(response, candidatePath);
}

function waitForServerReady(port: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const request = http.get(
      {
        host: '127.0.0.1',
        path: '/',
        port,
        timeout: 2000,
      },
      (response) => {
        response.resume();
        if ((response.statusCode ?? 500) >= 400) {
          reject(new Error(`Recovered webview dev server healthcheck failed with status ${response.statusCode}`));
          return;
        }
        resolve();
      },
    );

    request.on('error', reject);
    request.on('timeout', () => {
      request.destroy(new Error('Recovered webview dev server healthcheck timed out.'));
    });
  });
}

export async function ensureRecoveredWebviewDevServer(): Promise<void> {
  const indexPath = path.join(RECOVERED_WEBVIEW_ROOT, 'index.html');

  if (!fs.existsSync(indexPath)) {
    throw new Error(`Recovered webview index is missing: ${indexPath}`);
  }

  if (recoveredWebviewServer) {
    await waitForServerReady(RECOVERED_WEBVIEW_DEV_SERVER_PORT);
    return;
  }

  recoveredWebviewServer = http.createServer(handleRequest);

  await new Promise<void>((resolve, reject) => {
    recoveredWebviewServer?.once('error', reject);
    recoveredWebviewServer?.listen(RECOVERED_WEBVIEW_DEV_SERVER_PORT, '127.0.0.1', () => {
      recoveredWebviewServer?.off('error', reject);
      resolve();
    });
  }).catch(async (error: NodeJS.ErrnoException) => {
    recoveredWebviewServer = null;
    if (error?.code === 'EADDRINUSE') {
      await waitForServerReady(RECOVERED_WEBVIEW_DEV_SERVER_PORT);
      return;
    }
    throw error;
  });

  await waitForServerReady(RECOVERED_WEBVIEW_DEV_SERVER_PORT);
}

export function applyRecoveredLinuxHelperEnv(): void {
  if (process.platform !== 'linux') {
    return;
  }

  if (!fs.existsSync(RECOVERED_CODEX_CLI_PATH)) {
    throw new Error(`Recovered Codex CLI helper is missing: ${RECOVERED_CODEX_CLI_PATH}`);
  }

  if (!fs.existsSync(RECOVERED_RG_EXECUTABLE_PATH)) {
    throw new Error(`Recovered rg helper is missing: ${RECOVERED_RG_EXECUTABLE_PATH}`);
  }

  process.env.CODEX_CLI_PATH ??= RECOVERED_CODEX_CLI_PATH;
  process.env.RG_EXECUTABLE_PATH ??= RECOVERED_RG_EXECUTABLE_PATH;
  process.env.ELECTRON_RENDERER_URL ??= RECOVERED_WEBVIEW_DEV_SERVER_URL;
}

export async function closeRecoveredWebviewDevServer(): Promise<void> {
  if (!recoveredWebviewServer) {
    return;
  }

  const serverToClose = recoveredWebviewServer;
  recoveredWebviewServer = null;

  await new Promise<void>((resolve, reject) => {
    serverToClose.close((error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}

const childProcess = require('node:child_process');
const path = require('node:path');

const hostScriptPath = path.join(
  __dirname,
  '..',
  '..',
  'scripts',
  'linux-chrome-native-host.mjs',
);

function encodeNativeMessage(message) {
  const payload = Buffer.from(JSON.stringify(message), 'utf8');
  const header = Buffer.alloc(4);
  header.writeUInt32LE(payload.length, 0);
  return Buffer.concat([header, payload]);
}

function decodeNativeMessages(buffer) {
  const messages = [];
  let offset = 0;

  while (buffer.length - offset >= 4) {
    const length = buffer.readUInt32LE(offset);
    if (buffer.length - offset < 4 + length) {
      break;
    }

    const payload = buffer.subarray(offset + 4, offset + 4 + length);
    messages.push(JSON.parse(payload.toString('utf8')));
    offset += 4 + length;
  }

  return messages;
}

function runNativeHost(messages) {
  return new Promise((resolve, reject) => {
    const child = childProcess.spawn(process.execPath, [hostScriptPath], {
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    const stdout = [];
    const stderr = [];

    child.stdout.on('data', (chunk) => stdout.push(chunk));
    child.stderr.on('data', (chunk) => stderr.push(chunk));
    child.on('error', reject);
    child.on('close', (code) => {
      if (code !== 0) {
        reject(
          new Error(
            `native host exited with ${code}: ${Buffer.concat(stderr).toString('utf8')}`,
          ),
        );
        return;
      }

      resolve(decodeNativeMessages(Buffer.concat(stdout)));
    });

    for (const message of messages) {
      child.stdin.write(encodeNativeMessage(message));
    }
    child.stdin.end();
  });
}

describe('Linux Chrome native host', () => {
  test('answers extension health checks without JSON-RPC errors', async () => {
    const responses = await runNativeHost([
      { jsonrpc: '2.0', id: 1, method: 'ensureCodexAppServer', params: {} },
      { jsonrpc: '2.0', id: 2, method: 'ping' },
    ]);

    expect(responses).toEqual([
      {
        jsonrpc: '2.0',
        id: 1,
        result: {
          ready: true,
          platform: process.platform,
        },
      },
      {
        jsonrpc: '2.0',
        id: 2,
        result: {
          ready: true,
          platform: process.platform,
        },
      },
    ]);
  });
});

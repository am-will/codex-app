#!/usr/bin/env node
import fs from 'node:fs';

const logPath = '/tmp/codex-chrome-native-host.log';
let input = Buffer.alloc(0);

function log(message) {
  fs.appendFileSync(logPath, `${new Date().toISOString()} ${message}\n`);
}

function send(message) {
  const payload = Buffer.from(JSON.stringify(message), 'utf8');
  const header = Buffer.alloc(4);
  header.writeUInt32LE(payload.length, 0);
  process.stdout.write(Buffer.concat([header, payload]));
}

function respond(request, result) {
  if (request && Object.prototype.hasOwnProperty.call(request, 'id')) {
    send({
      jsonrpc: '2.0',
      id: request.id,
      result,
    });
  }
}

function respondError(request, message) {
  if (request && Object.prototype.hasOwnProperty.call(request, 'id')) {
    send({
      jsonrpc: '2.0',
      id: request.id,
      error: {
        code: -32601,
        message,
      },
    });
  }
}

function handleMessage(request) {
  log(`request ${JSON.stringify(request)}`);

  switch (request?.method) {
    case 'ping':
      respond(request, {
        ready: true,
        platform: process.platform,
      });
      return;

    case 'ensureCodexAppServer':
      respond(request, {
        ready: true,
        platform: process.platform,
      });
      return;

    default:
      respondError(request, `Unsupported native host method: ${request?.method ?? 'unknown'}`);
  }
}

function drainInput() {
  while (input.length >= 4) {
    const length = input.readUInt32LE(0);
    if (input.length < 4 + length) {
      return;
    }

    const payload = input.subarray(4, 4 + length);
    input = input.subarray(4 + length);
    handleMessage(JSON.parse(payload.toString('utf8')));
  }
}

process.stdin.on('data', (chunk) => {
  input = Buffer.concat([input, chunk]);
  drainInput();
});

process.stdin.on('end', () => {
  log('stdin ended');
});

log(`started pid=${process.pid}`);

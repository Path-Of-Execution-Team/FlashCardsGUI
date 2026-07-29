import { spawnSync } from 'node:child_process';
import path from 'node:path';

const [, , command, ...args] = process.argv;

if (command !== 'open' && command !== 'run') {
  throw new Error('Expected "open" or "run" as the Cypress command.');
}

const environment = { ...process.env };
delete environment.ELECTRON_RUN_AS_NODE;

const cypressCli = path.join(process.cwd(), 'node_modules', 'cypress', 'bin', 'cypress');
const result = spawnSync(process.execPath, [cypressCli, command, ...args], {
  cwd: process.cwd(),
  env: environment,
  stdio: 'inherit',
});

if (result.error) {
  throw result.error;
}

process.exitCode = result.status ?? 1;

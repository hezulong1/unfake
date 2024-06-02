import { execSync } from 'node:child_process';
import { red, yellow } from './colors.mjs';

let err = false;

const nodeVersion = /^(\d+)\.(\d+)\.(\d+)/.exec(process.versions.node);
const majorNodeVersion = Number.parseInt(nodeVersion[1]);

if (!process.env.DISPLAYOS_SKIP_NODE_VERSION_CHECK) {
  if (majorNodeVersion < 16) {
    console.error(red('Please use node.js versions >=16.0.0.'));
    err = true;
  }
  if (majorNodeVersion >= 19) {
    console.warn(yellow('Warning: Versions of node.js >= 19 have not been tested.'));
  }
}

const yarnVersion = execSync('yarn -v', { encoding: 'utf8' }).trim();
const parsedYarnVersion = /^(\d+)\.(\d+)\.(\d+)/.exec(yarnVersion);
const majorYarnVersion = Number.parseInt(parsedYarnVersion[1]);
const minorYarnVersion = Number.parseInt(parsedYarnVersion[2]);
const patchYarnVersion = Number.parseInt(parsedYarnVersion[3]);

if (
  majorYarnVersion < 1 ||
  (majorYarnVersion === 1 && (
    minorYarnVersion < 10 || (minorYarnVersion === 10 && patchYarnVersion < 1)
  )) ||
  majorYarnVersion >= 2
) {
  console.error(red('Please use yarn >=1.10.1 and <2.'));
  err = true;
}

if (!/yarn[\w-.]*\.c?js$|yarnpkg$/.test(process.env.npm_execpath || '')) {
  console.error(red('Please use yarn to install dependencies.'));
  err = true;
}

if (err) {
  console.error('');
  process.exit(1);
}

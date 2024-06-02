import process from 'node:process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'fs-extra';
import colors from 'picocolors';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const msgPath = path.resolve(dirname, '../.git/COMMIT_EDITMSG');
const msg = fs.readFileSync(msgPath, 'utf8').trim();

const commitRE = /^(Revert )?(feat|fix|refactor|perf|wip|docs|style|chore|types)(\(.+\))?: .{1,120}/;

if (!commitRE.test(msg)) {
  console.log();
  console.error(
    `${colors.bgRed(colors.white(' ERROR '))} ${colors.red('invalid commit message format.')}\n\n` +
    `${colors.red('Proper commit message format is required for automated changelog generation. Examples:\n\n')}` +
    `  ${colors.green('feat: add \'comments\' option')}\n` +
    `  ${colors.dim('--------------')}\n` +
    `  ${colors.green('fix(shared): #20001 修复 isNumber 参数类型错误 @hzl')}\n\n` +
    `${colors.red('See .gitlab/commit-convention.md for more details.\n')}`,
  );
  process.exit(1);
}

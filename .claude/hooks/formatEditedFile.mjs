// PostToolUse hook (Edit|Write): formats the file Claude just changed, so every edit matches the
// project's style before anyone reads it. Prettier runs on the files it formats (respecting
// .prettierignore); ESLint --fix runs on JavaScript and TypeScript files. It never blocks the
// agent: anything left unfixed is reported by `pnpm lint`.
// Adapted from ashen-contracts (.claude/hooks/formatEditedFile.mjs) for a single-package project.
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const projectRoot = join(import.meta.dirname, '..', '..');
const LINTABLE = /\.(ts|tsx|js|mjs)$/;

function run(command, args) {
  try {
    execFileSync(command, args, { cwd: projectRoot, stdio: 'ignore' });
  } catch {
    // Unformattable input or errors that need a decision: leave them for `pnpm lint`.
  }
}

const input = JSON.parse(readFileSync(0, 'utf8'));
const file = input.tool_response?.filePath ?? input.tool_input?.file_path;
if (!file || !existsSync(file)) process.exit(0);

const path = relative(projectRoot, file);
if (path.startsWith('..') || path.split(sep).includes('node_modules'))
  process.exit(0);

run('pnpm', ['exec', 'prettier', '--write', '--ignore-unknown', file]);
if (LINTABLE.test(file)) {
  run('pnpm', ['exec', 'eslint', '--fix', '--no-warn-ignored', file]);
}

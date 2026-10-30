// Step 4 of `pnpm build` (docs/ARCHITECTURE.md section 2): writes one static HTML file per route
// from the server build of the React app, then removes the server build. Node 24 runs this file
// directly, without a compile step.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { pathToFileURL } from 'node:url';

import type { RenderResult } from '../src/app/app.types';
import {
  DIST_DIRECTORY,
  SERVER_DIRECTORY,
  SERVER_ENTRY_FILE,
  TEMPLATE_FILE,
} from './prerender.constants.ts';
import {
  fillTemplate,
  isServerEntry,
  outputFileFor,
} from './prerender.utils.ts';

const template: string = await readFile(TEMPLATE_FILE, 'utf8');
const serverEntry: unknown = await import(
  pathToFileURL(SERVER_ENTRY_FILE).href
);
if (!isServerEntry(serverEntry)) {
  throw new Error(
    `${SERVER_ENTRY_FILE} does not export render() and ROUTE_PATHS.`,
  );
}

for (const path of serverEntry.ROUTE_PATHS) {
  const result: RenderResult = serverEntry.render(path);
  const file: string = outputFileFor(DIST_DIRECTORY, path);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, fillTemplate(template, result));
  console.log(`Pre-rendered ${path} → ${file}`);
}

await rm(SERVER_DIRECTORY, { recursive: true, force: true });

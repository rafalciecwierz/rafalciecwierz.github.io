import { fileURLToPath } from 'node:url';

// Paths are resolved from this file, so the script works from any working directory.
export const DIST_DIRECTORY: string = fileURLToPath(
  new URL('../dist/', import.meta.url),
);
export const SERVER_DIRECTORY: string = fileURLToPath(
  new URL('../dist-server/', import.meta.url),
);
export const TEMPLATE_FILE: string = `${DIST_DIRECTORY}index.html`;
export const SERVER_ENTRY_FILE: string = `${SERVER_DIRECTORY}entryServer.js`;

// The placeholders in index.html that the pre-rendered head and page replace.
export const HEAD_MARKER: string = '<!--app-head-->';
export const HTML_MARKER: string = '<!--app-html-->';

export const PAGE_FILE_NAME: string = 'index.html';

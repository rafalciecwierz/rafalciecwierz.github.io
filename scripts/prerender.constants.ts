import { fileURLToPath } from 'node:url';

export const DIST_DIRECTORY: string = fileURLToPath(
  new URL('../dist/', import.meta.url),
);
export const SERVER_DIRECTORY: string = fileURLToPath(
  new URL('../dist-server/', import.meta.url),
);
export const TEMPLATE_FILE: string = `${DIST_DIRECTORY}index.html`;
export const SERVER_ENTRY_FILE: string = `${SERVER_DIRECTORY}entryServer.js`;

export const HEAD_MARKER: string = '<!--app-head-->';
export const HTML_MARKER: string = '<!--app-html-->';

export const STYLESHEET_LINK: RegExp =
  /<link rel="stylesheet"[^>]*\shref="([^"]+)"[^>]*>/g;
export const STYLE_END_TAG: string = '</style';

export const PAGE_FILE_NAME: string = 'index.html';
export const HTML_EXTENSION: string = '.html';

export const SITEMAP_FILE: string = `${DIST_DIRECTORY}sitemap.xml`;

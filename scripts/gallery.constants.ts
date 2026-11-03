import { fileURLToPath } from 'node:url';

// Paths are resolved from this file, so the script works from any working directory.
export const DESIGN_DIRECTORY: string = fileURLToPath(
  new URL('../design/', import.meta.url),
);
// Served at /design/, which GitHub Pages answers with design/index.html.
export const GALLERY_DIRECTORY: string = fileURLToPath(
  new URL('../dist/design/', import.meta.url),
);

// What the gallery publishes from design/. Whole folders, so a new iteration is published
// without touching this list. design/og-image.html is left out: it is the source of
// public/og-image.png, not part of the gallery.
export const GALLERY_ENTRIES: readonly string[] = [
  'index.html',
  'prototypes',
  'iterations',
];

export const GALLERY_PAGE: string = 'index.html';

// href and src values in the HTML. Prototypes build some links in scripts, but the gallery
// page has no scripts, so every link it has is in an attribute.
export const LINK_ATTRIBUTE: RegExp = /\s(?:href|src)="([^"]*)"/g;
// A scheme (https:, mailto:, data:), a protocol-relative URL or an in-page anchor: nothing
// on disk to check.
export const NOT_A_FILE_LINK: RegExp = /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i;

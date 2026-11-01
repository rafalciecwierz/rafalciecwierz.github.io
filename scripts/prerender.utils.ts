import { join } from 'node:path';

import type { RenderResult, ServerEntry } from '../src/app/app.types';
import {
  HEAD_MARKER,
  HTML_EXTENSION,
  HTML_MARKER,
  PAGE_FILE_NAME,
} from './prerender.constants.ts';

// Puts the rendered head and page into the built index.html. A missing marker is an error,
// so a changed template can never ship an empty page.
export function fillTemplate(template: string, result: RenderResult): string {
  for (const marker of [HEAD_MARKER, HTML_MARKER]) {
    if (!template.includes(marker)) {
      throw new Error(`The template has no ${marker} marker.`);
    }
  }
  return template
    .replace(HEAD_MARKER, result.head)
    .replace(HTML_MARKER, result.html);
}

// "/" becomes dist/index.html and "/design/" becomes dist/design/index.html, which is how
// GitHub Pages serves a folder URL. A path that names a file, like "/404.html", is that file.
export function outputFileFor(distDirectory: string, path: string): string {
  return path.endsWith(HTML_EXTENSION)
    ? join(distDirectory, path)
    : join(distDirectory, path, PAGE_FILE_NAME);
}

// The server entry is loaded with import() at runtime, so its shape is checked, not assumed.
export function isServerEntry(value: unknown): value is ServerEntry {
  return (
    typeof value === 'object' &&
    value !== null &&
    'render' in value &&
    typeof value.render === 'function' &&
    'ROUTE_PATHS' in value &&
    Array.isArray(value.ROUTE_PATHS) &&
    'SITEMAP' in value &&
    typeof value.SITEMAP === 'string'
  );
}

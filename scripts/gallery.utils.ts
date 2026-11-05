import { join } from 'node:path';

import { LINK_ATTRIBUTE, NOT_A_FILE_LINK } from './gallery.constants.ts';
import type { GalleryCorrection } from './gallery.types.ts';
import { PAGE_FILE_NAME } from './prerender.constants.ts';

// The links in a page that point to a file on the same site, without their #anchor or
// ?query. External links, mailto: and in-page anchors are left out.
export function findLocalLinks(html: string): string[] {
  return [...html.matchAll(LINK_ATTRIBUTE)]
    .map((match: RegExpExecArray): string => match[1]?.split(/[?#]/)[0] ?? '')
    .filter(
      (link: string): boolean => link !== '' && !NOT_A_FILE_LINK.test(link),
    );
}

// The file a local link opens. "/x" starts at the site root, anything else at the page's
// folder, and a folder link ("/", "prototypes/") opens that folder's index.html, as on
// GitHub Pages.
export function resolveLink(
  link: string,
  pageDirectory: string,
  rootDirectory: string,
): string {
  const file: string = link.startsWith('/')
    ? join(rootDirectory, link)
    : join(pageDirectory, link);
  return link.endsWith('/') ? join(file, PAGE_FILE_NAME) : file;
}

// The local links in a page that point to no file. `exists` is passed in, so the check can
// be tested without a real folder.
export function findBrokenLinks(
  html: string,
  pageDirectory: string,
  rootDirectory: string,
  exists: (file: string) => boolean,
): string[] {
  return findLocalLinks(html).filter(
    (link: string): boolean =>
      !exists(resolveLink(link, pageDirectory, rootDirectory)),
  );
}

// Applies the factual corrections to the published prototypes and returns new pages (the
// input is left as it is). Occurrences are counted across all pages together, and any count
// other than the expected one fails the build: it means the draft text moved, and the
// correction would otherwise stop working without anyone noticing.
export function applyCorrections(
  pages: ReadonlyMap<string, string>,
  corrections: readonly GalleryCorrection[],
): Map<string, string> {
  const problems: string[] = corrections
    .map(({ find, count }: GalleryCorrection): string => {
      let found: number = 0;
      for (const html of pages.values()) {
        found += html.split(find).length - 1;
      }
      return found === count
        ? ''
        : `found ${String(found)} times, expected ${String(count)}: "${find}"`;
    })
    .filter((problem: string): boolean => problem !== '');
  if (problems.length > 0) {
    throw new Error(
      `Gallery corrections no longer match the prototypes:\n${problems.join('\n')}`,
    );
  }

  const corrected: Map<string, string> = new Map<string, string>();
  for (const [file, html] of pages) {
    corrected.set(
      file,
      corrections.reduce(
        (text: string, { find, replace }: GalleryCorrection): string =>
          text.replaceAll(find, replace),
        html,
      ),
    );
  }
  return corrected;
}

// Adds the draft note as the last element of the page's body.
export function addDraftNote(html: string, note: string): string {
  const end: number = html.lastIndexOf('</body>');
  if (end === -1) {
    throw new Error('A prototype has no </body> to put the draft note before.');
  }
  return html.slice(0, end) + note + html.slice(end);
}

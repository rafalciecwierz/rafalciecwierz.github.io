import { join } from 'node:path';

import { LINK_ATTRIBUTE, NOT_A_FILE_LINK } from './gallery.constants.ts';
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

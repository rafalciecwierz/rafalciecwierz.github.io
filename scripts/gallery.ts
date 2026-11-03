// Step 5 of `pnpm build` (docs/ARCHITECTURE.md section 2): publishes the design prototypes
// as static files at /design/, outside the React bundle (roadmap task 3.17). It runs after
// the pre-render, so the site's own pages exist when the gallery's links are checked.
import { existsSync } from 'node:fs';
import { cp, readFile, rm } from 'node:fs/promises';
import { join } from 'node:path';

import {
  DESIGN_DIRECTORY,
  GALLERY_DIRECTORY,
  GALLERY_ENTRIES,
  GALLERY_PAGE,
} from './gallery.constants.ts';
import { findBrokenLinks } from './gallery.utils.ts';
import { DIST_DIRECTORY } from './prerender.constants.ts';

// Copied as they are: the prototypes are a record of the exploration and are never edited.
await rm(GALLERY_DIRECTORY, { recursive: true, force: true });
for (const entry of GALLERY_ENTRIES) {
  await cp(join(DESIGN_DIRECTORY, entry), join(GALLERY_DIRECTORY, entry), {
    recursive: true,
  });
}

// A link in the gallery that leads nowhere fails the build, so it never reaches the live site.
const page: string = await readFile(
  join(GALLERY_DIRECTORY, GALLERY_PAGE),
  'utf8',
);
const brokenLinks: string[] = findBrokenLinks(
  page,
  GALLERY_DIRECTORY,
  DIST_DIRECTORY,
  existsSync,
);
if (brokenLinks.length > 0) {
  throw new Error(
    `design/${GALLERY_PAGE} links to files that are not published: ${brokenLinks.join(', ')}`,
  );
}

console.log(`Published the prototype gallery → ${GALLERY_DIRECTORY}`);

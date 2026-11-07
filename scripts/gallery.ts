// Step 5 of `pnpm build` (docs/ARCHITECTURE.md section 2): publishes the design prototypes
// as static files at /design/, outside the React bundle. It runs after
// the pre-render, so the site's own pages exist when the gallery's links are checked.
import { existsSync } from 'node:fs';
import { cp, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import {
  DESIGN_DIRECTORY,
  DRAFT_NOTE_TEMPLATE,
  DRAFT_NOTE_TEXTS,
  GALLERY_DIRECTORY,
  GALLERY_ENTRIES,
  GALLERY_PAGE,
} from './gallery.constants.ts';
import { GALLERY_CORRECTIONS } from './gallery.corrections.ts';
import type { DraftNoteText } from './gallery.types.ts';
import {
  addDraftNote,
  applyCorrections,
  findBrokenLinks,
} from './gallery.utils.ts';
import { DIST_DIRECTORY } from './prerender.constants.ts';

// Copied as they are: the files in design/ are a record of the exploration and are never
// edited. Only the published copy changes below.
await rm(GALLERY_DIRECTORY, { recursive: true, force: true });
for (const entry of GALLERY_ENTRIES) {
  await cp(join(DESIGN_DIRECTORY, entry), join(GALLERY_DIRECTORY, entry), {
    recursive: true,
  });
}

// The published prototypes keep their draft copy, with the facts about Rafał corrected and a
// note saying so. The build fails if a correction no longer matches.
const pages: Map<string, string> = new Map<string, string>();
const texts: Map<string, DraftNoteText> = new Map<string, DraftNoteText>();
for (const [folder, text] of Object.entries(DRAFT_NOTE_TEXTS)) {
  for (const name of await readdir(join(GALLERY_DIRECTORY, folder))) {
    if (!name.endsWith('.html')) continue;
    const file: string = join(GALLERY_DIRECTORY, folder, name);
    pages.set(file, await readFile(file, 'utf8'));
    texts.set(file, text);
  }
}
for (const [file, html] of applyCorrections(pages, GALLERY_CORRECTIONS)) {
  const text: DraftNoteText | undefined = texts.get(file);
  const note: string = DRAFT_NOTE_TEMPLATE.replace(
    '{wide}',
    text?.wide ?? '',
  ).replace('{narrow}', text?.narrow ?? '');
  await writeFile(file, addDraftNote(html, note));
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

console.log(
  `Published the prototype gallery (${String(pages.size)} pages with the draft note) → ${GALLERY_DIRECTORY}`,
);

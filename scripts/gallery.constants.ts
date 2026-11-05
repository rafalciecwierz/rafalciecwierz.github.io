import { fileURLToPath } from 'node:url';

import type { DraftNoteText } from './gallery.types.ts';

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

// The published folders whose pages get the draft note, each with its text (roadmap task
// 3.20). The gallery page itself says the same in its own text.
export const DRAFT_NOTE_TEXTS: Readonly<Record<string, DraftNoteText>> = {
  prototypes: {
    wide: 'Design prototype, built 24–26.10.2026: early draft copy, kept as built, with factual errors corrected.',
    narrow: 'Draft prototype, facts corrected.',
  },
  iterations: {
    wide: 'Iteration of the chosen design, built 28.10.2026: early draft copy, kept as built, with factual errors corrected.',
    narrow: 'Draft iteration, facts corrected.',
  },
};

// The note added at the end of every published prototype. It is fixed to the bottom of the
// screen, because most prototypes pin their own header to the top, and it is last in the
// page, so the prototype's skip link stays the first thing Tab reaches. It is one line high
// (short text below 960 px) so it covers as little as possible, and closing it hides it on
// every gallery page for the rest of the browser session (sessionStorage; if storage is
// blocked, it only hides on this page). Its styles are scoped to its id and reset with
// `all`, so the prototype's own CSS cannot restyle it. {wide} and {narrow} are replaced with
// a DRAFT_NOTE_TEXTS entry.
export const DRAFT_NOTE_TEMPLATE: string = `<aside id="gallery-draft-note" lang="en" aria-label="About this page">
<style>
#gallery-draft-note { all: initial; position: fixed; z-index: 2147483647; left: 50%; bottom: 8px; transform: translateX(-50%); box-sizing: border-box; display: flex; align-items: center; gap: 10px; width: max-content; max-width: calc(100% - 16px); padding: 4px 4px 4px 12px; background: #141414; color: #f2f2f2; border: 1px solid #8a8a8a; border-radius: 8px; box-shadow: 0 4px 16px rgb(0 0 0 / 35%); font: 13px/1.4 system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; }
#gallery-draft-note * { all: revert; box-sizing: border-box; font: inherit; color: inherit; }
#gallery-draft-note p { min-width: 0; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
#gallery-draft-note a { margin-left: 6px; color: #ffd27a; text-decoration: underline; text-underline-offset: 2px; }
#gallery-draft-note button { flex: none; display: grid; place-items: center; width: 28px; height: 28px; padding: 0; background: transparent; border: 1px solid #8a8a8a; border-radius: 6px; font-size: 16px; line-height: 1; cursor: pointer; }
#gallery-draft-note :focus-visible { outline: 2px solid #ffd27a; outline-offset: 2px; }
#gallery-draft-note .narrow { display: none; }
@media (max-width: 959px) { #gallery-draft-note .wide { display: none; } #gallery-draft-note .narrow { display: inline; } }
</style>
<p><span class="wide">{wide}</span><span class="narrow">{narrow}</span><a href="/" aria-label="Back to the site"><span aria-hidden="true">← </span><span class="wide">Back to the site</span><span class="narrow">Site</span></a></p>
<button type="button" aria-label="Hide this note"><span aria-hidden="true">×</span></button>
<script>
(() => {
  const note = document.getElementById('gallery-draft-note');
  const key = 'gallery-draft-note-hidden';
  try { if (sessionStorage.getItem(key)) { note.remove(); return; } } catch {}
  note.querySelector('button').addEventListener('click', () => {
    try { sessionStorage.setItem(key, '1'); } catch {}
    note.remove();
  });
})();
</script>
</aside>
`;

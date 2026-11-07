import type { GalleryCorrection } from './gallery.types.ts';

// Factual corrections applied to the published copy of the prototypes. The files in design/
// stay as they were built; only facts are corrected here, never style or TODO placeholders.
// Each replacement is the final wording from docs/PROJECT_BRIEF.md and must not contain
// quotes, because the sentences sit inside JS strings in the prototypes.
export const GALLERY_CORRECTIONS: readonly GalleryCorrection[] = [
  {
    find: "I started my career in QA automation, moved into frontend development after three months at my team's request, and later led a team of six developers.",
    replace:
      'I started out in QA automation, and three months in, backed by a great team, I made the switch to frontend development. About a year into my next company, I was promoted to lead its frontend team of six developers.',
    count: 17,
  },
  {
    find: "to front-end developer after 3 months at the product team's request.",
    replace: 'to front-end developer after 3 months.',
    count: 14,
  },
  {
    find: 'to front-end developer after 3 months at the product team’s request.',
    replace: 'to front-end developer after 3 months.',
    count: 3,
  },
  {
    find: "Promoted after three months, at the product team's request",
    replace: 'Promoted after three months, backed by a great team',
    count: 1,
  },
  {
    find: 'at the team’s request',
    replace: 'backed by a great team',
    count: 4,
  },
  {
    find: 'Three months later, the product team asked for him as a developer.',
    replace:
      'Three months later, backed by a great team, he made the switch to developer.',
    count: 1,
  },
  {
    find: 'Open to frontend roles (React / TypeScript), remote or hybrid.',
    replace:
      'Open to frontend and full-stack roles (React / TypeScript / NestJS), remote or hybrid.',
    count: 18,
  },
];

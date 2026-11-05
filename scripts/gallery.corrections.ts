import type { GalleryCorrection } from './gallery.types.ts';

// Factual corrections applied to the published copy of the prototypes (roadmap task 3.20),
// approved by Rafał on 5.11.2026 (the short forms after the audit). The files in design/ stay as they were built; only facts
// are corrected here, never style or TODO placeholders. Each replacement is the final
// wording from docs/PROJECT_BRIEF.md and must not contain quotes, because the sentences sit
// inside JS strings in the prototypes.
export const GALLERY_CORRECTIONS: readonly GalleryCorrection[] = [
  {
    // About: the switch to frontend was his, and the team of six was at the next company.
    find: "I started my career in QA automation, moved into frontend development after three months at my team's request, and later led a team of six developers.",
    replace:
      'I started out in QA automation, and three months in, backed by a great team, I made the switch to frontend development. About a year into my next company, I was promoted to lead its frontend team of six developers.',
    count: 17,
  },
  // Career, mTab: the promotion was not at the team's request. Written with two kinds of
  // apostrophe across the prototypes.
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
  // The same claim in short form: hero lines and stat captions.
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
    // Availability: full-stack roles were added after the prototypes were built.
    find: 'Open to frontend roles (React / TypeScript), remote or hybrid.',
    replace:
      'Open to frontend and full-stack roles (React / TypeScript / NestJS), remote or hybrid.',
    count: 18,
  },
];

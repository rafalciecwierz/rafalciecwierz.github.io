// The id of every part of the page. They are the anchors in the URL (`/#career`), so they are
// constants, not content, and stay the same in every language (docs/ARCHITECTURE.md section 7).
export const SECTION_IDS = {
  main: 'main',
  hero: 'top',
  about: 'about',
  stack: 'stack',
  career: 'career',
  team: 'team',
  projects: 'projects',
  process: 'process',
  contact: 'contact',
} as const;

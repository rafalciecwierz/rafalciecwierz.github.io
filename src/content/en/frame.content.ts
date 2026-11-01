import { SECTION_IDS } from '@/constants';

import type { Brand, Footer, Nav } from '../frame.types';

// The page frame from the reference design (design/iterations/08-ascent-dark-v2.html):
// the header, the navigation (brief 4.1) and the footer (brief 4.10).

export const nav: Nav = {
  skipToContent: 'Skip to content',
  label: 'Main',
  menu: 'Menu',
  close: 'Close',
  links: [
    { sectionId: SECTION_IDS.about, label: 'About' },
    { sectionId: SECTION_IDS.stack, label: 'Stack' },
    { sectionId: SECTION_IDS.career, label: 'Career' },
    { sectionId: SECTION_IDS.projects, label: 'Projects' },
    { sectionId: SECTION_IDS.process, label: 'Process' },
    { sectionId: SECTION_IDS.contact, label: 'Contact' },
  ],
};

export const brand: Brand = {
  text: 'Portfolio',
  accessibleName: (initials: string, text: string): string =>
    `${initials} ${text}, back to top`,
};

export const footer: Footer = {
  builtWith: 'Built with React, TypeScript and GSAP',
  separator: '·',
  repoUrl: 'https://github.com/rafalciecwierz/rafalciecwierz.github.io',
  repoLabel: 'Source on GitHub',
  sign: 'Rafał Ciećwierz',
  copyright: (year: number, sign: string): string =>
    `© ${String(year)} ${sign}`,
  bubble: 'Thanks for training with me!',
  sessionOver: 'Session over.',
  line: '22+ years of parkour, and still landing it.',
  // The arrow is an icon next to the link, hidden from screen readers.
  backToTop: 'Back to the summit',
};

export const consoleGreeting: string =
  'Hey, fellow dev. The runner on the sign is an SVG rig: ten joint angles blended between keyframe poses. Click a letter and he jumps to it; click him and every click is a different trick.';

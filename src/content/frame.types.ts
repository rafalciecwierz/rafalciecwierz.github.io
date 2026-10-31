import type { SectionId } from '@/constants';
export type NavLink = {
  sectionId: SectionId;
  label: string;
};

export type Nav = {
  skipToContent: string;
  label: string;
  menu: string;
  close: string;
  links: readonly NavLink[];
};

export type Brand = {
  text: string;
  // The accessible name starts with the visible text (WCAG 2.5.3).
  accessibleName: (initials: string, text: string) => string;
};

export type Footer = {
  builtWith: string;
  repoUrl: string;
  repoLabel: string;
  sign: string;
  bubble: string;
  sessionOver: string;
  line: string;
  backToTop: string;
};

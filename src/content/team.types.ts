import type { SectionHeading } from './shared.types';

export type Quote = {
  id: string;
  // First name and surname initial, as the brief asks (section 5.6).
  author: string;
  role: string;
  // Word for word; shortened only with "…".
  paragraphs: readonly string[];
};

export type Team = {
  heading: SectionHeading;
  intro: string;
  posterHeading: string;
  source: string;
  quotes: readonly Quote[];
};

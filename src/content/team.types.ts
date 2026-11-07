import type { SectionHeading } from './shared.types';

export type Quote = {
  id: string;
  author: string;
  role: string;
  paragraphs: readonly string[];
};

export type Team = {
  heading: SectionHeading;
  intro: string;
  posterHeading: string;
  source: string;
  caption: (role: string, source: string) => string;
  quotes: readonly Quote[];
};

import type { NumberedSectionHeading, Stat } from './shared.types';

export type About = {
  heading: NumberedSectionHeading;
  paragraphs: readonly string[];
  facts: readonly Stat[];
};

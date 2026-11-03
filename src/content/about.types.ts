import type { NumberedSectionHeading, RichText, Stat } from './shared.types';

export type About = {
  heading: NumberedSectionHeading;
  paragraphs: readonly RichText[];
  facts: readonly Stat[];
};

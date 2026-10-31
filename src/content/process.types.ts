import type { NumberedSectionHeading, Stat } from './shared.types';

export type Process = {
  heading: NumberedSectionHeading;
  intro: string;
  // The signs on the two roofs of the leap.
  sceneSigns: readonly [string, string];
  replay: string;
  how: { title: string; paragraphs: readonly string[] | null; todo: string };
  site: {
    title: string;
    paragraphs: readonly string[];
    facts: readonly Stat[];
    source: string;
    role: string | null;
    roleTodo: string;
    galleryLabel: string;
    galleryUrl: string | null;
  };
};

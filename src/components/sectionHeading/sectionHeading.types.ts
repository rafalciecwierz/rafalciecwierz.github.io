import type { NumberedSectionHeading, SectionHeading } from '@/content';

// The sections in the navigation have a number ("01"); From the team has none.
export type SectionHeadingContent = SectionHeading | NumberedSectionHeading;

// `large` is the Contact title, the biggest on the page.
export type SectionHeadingSize = 'regular' | 'large';

export type SectionHeadingProps = {
  heading: SectionHeadingContent;
  // The id the section points to with aria-labelledby.
  titleId: string;
  intro?: string;
  size?: SectionHeadingSize;
};

import type { NumberedSectionHeading, SectionHeading } from '@/content';

export type SectionHeadingContent = SectionHeading | NumberedSectionHeading;

export type SectionHeadingSize = 'regular' | 'large';

export type SectionHeadingProps = {
  heading: SectionHeadingContent;
  titleId: string;
  intro?: string;
  size?: SectionHeadingSize;
};

import type { SectionHeadingContent } from './sectionHeading.types';

export function sectionNumber(heading: SectionHeadingContent): string | null {
  return 'number' in heading ? heading.number : null;
}

import type { SectionHeadingContent } from './sectionHeading.types';

// The kicker number ("01"), or null for a section outside the navigation.
export function sectionNumber(heading: SectionHeadingContent): string | null {
  return 'number' in heading ? heading.number : null;
}

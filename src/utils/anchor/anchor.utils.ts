import type { SectionId } from '@/constants';

// The href of a link to a section on this page: `#career`.
export function anchorHref(sectionId: SectionId): string {
  return `#${sectionId}`;
}

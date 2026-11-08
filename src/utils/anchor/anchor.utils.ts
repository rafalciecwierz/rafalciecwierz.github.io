import type { SectionId } from '@/constants';

export function anchorHref(sectionId: SectionId): string {
  return `#${sectionId}`;
}

import type { SECTION_IDS } from './sectionIds.constants';

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

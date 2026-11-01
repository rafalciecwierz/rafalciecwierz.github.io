import type { ReactNode, Ref } from 'react';

import type { SectionId } from '@/constants';

// `concrete` is the wall texture behind About and Projects.
export type SectionSurface = 'plain' | 'concrete';

// `none` for the sections that lay out their own space: the full-height hero and the pinned
// career run.
export type SectionSpacing = 'padded' | 'none';

export type SectionProps = {
  id: SectionId;
  // The id of the section's heading, which gives the region its accessible name.
  labelledBy: string;
  surface?: SectionSurface;
  spacing?: SectionSpacing;
  // The section's own layout, from its CSS Module.
  className?: string | undefined;
  ref?: Ref<HTMLElement>;
  children: ReactNode;
};

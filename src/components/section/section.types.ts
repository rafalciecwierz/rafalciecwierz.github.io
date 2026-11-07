import type { ReactNode, Ref } from 'react';

import type { SectionId } from '@/constants';

export type SectionSurface = 'plain' | 'concrete';

export type SectionSpacing = 'padded' | 'none';

export type SectionProps = {
  id: SectionId;
  labelledBy: string;
  surface?: SectionSurface;
  spacing?: SectionSpacing;
  className?: string | undefined;
  ref?: Ref<HTMLElement>;
  children: ReactNode;
};

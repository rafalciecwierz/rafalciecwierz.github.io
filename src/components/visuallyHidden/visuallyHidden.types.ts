import type { ReactNode } from 'react';

export type VisuallyHiddenProps = {
  live?: 'polite' | undefined;
  children: ReactNode;
};

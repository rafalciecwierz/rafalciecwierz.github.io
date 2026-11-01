import type { ReactNode } from 'react';

export type VisuallyHiddenProps = {
  // polite: a live region, so screen readers announce a change of its text ("Email address copied").
  live?: 'polite' | undefined;
  children: ReactNode;
};

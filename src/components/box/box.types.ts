import type { ReactNode } from 'react';

export type BoxProps = {
  // The layout, from the parent's CSS Module (a grid, a column, a gap).
  className?: string | undefined;
  children: ReactNode;
};

import type { ReactNode } from 'react';

export type ContainerProps = {
  // The layout of what it holds (a grid, for example), from the parent's CSS Module.
  className?: string | undefined;
  children: ReactNode;
};

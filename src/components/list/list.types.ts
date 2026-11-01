import type { ReactNode } from 'react';

import type { LIST_TAGS } from './list.constants';

// `ordered` when the order means something: the career, newest first, or the numbered projects.
export type ListKind = keyof typeof LIST_TAGS;

export type ListTag = (typeof LIST_TAGS)[ListKind];

export type ListProps = {
  kind?: ListKind;
  // An accessible name, for a list that has no heading of its own.
  label?: string;
  // The layout of the items, from the parent's CSS Module.
  className?: string | undefined;
  children: ReactNode;
};

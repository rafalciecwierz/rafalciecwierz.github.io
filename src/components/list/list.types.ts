import type { ReactNode } from 'react';

import type { LIST_TAGS } from './list.constants';

export type ListKind = keyof typeof LIST_TAGS;

export type ListTag = (typeof LIST_TAGS)[ListKind];

export type ListProps = {
  kind?: ListKind;
  label?: string;
  className?: string | undefined;
  children: ReactNode;
};

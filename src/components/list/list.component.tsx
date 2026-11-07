import type { ReactElement } from 'react';

import { LIST_TAGS } from './list.constants';
import type { ListProps, ListTag } from './list.types';

export function List({
  kind = 'unordered',
  label,
  className,
  children,
}: ListProps): ReactElement {
  const Tag: ListTag = LIST_TAGS[kind];

  return (
    <Tag aria-label={label} className={className}>
      {children}
    </Tag>
  );
}

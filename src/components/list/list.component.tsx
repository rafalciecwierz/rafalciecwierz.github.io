import type { ReactElement } from 'react';

import { LIST_TAGS } from './list.constants';
import type { ListProps, ListTag } from './list.types';

// A list without bullets or indent (global.scss). Its items are ListItem components.
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

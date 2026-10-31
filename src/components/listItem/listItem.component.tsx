import type { ReactElement } from 'react';

import type { ListItemProps } from './listItem.types';

// One item of a List.
export function ListItem({ className, children }: ListItemProps): ReactElement {
  return <li className={className}>{children}</li>;
}

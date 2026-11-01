import type { ReactElement } from 'react';

import { classNames } from '@/utils';

import styles from './actionGroup.module.scss';
import type { ActionGroupProps } from './actionGroup.types';

// A row of actions (ButtonLink, TextLink) that wraps onto more lines when it runs out of room.
// Used by the hero, the career's next step, the leap and Contact.
export function ActionGroup({
  className,
  children,
}: ActionGroupProps): ReactElement {
  return (
    <div className={classNames(styles.actionGroup, className)}>{children}</div>
  );
}

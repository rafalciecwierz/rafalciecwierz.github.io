import type { ReactElement } from 'react';

import { classNames } from '@/utils';

import styles from './actionGroup.module.scss';
import type { ActionGroupProps } from './actionGroup.types';

export function ActionGroup({
  className,
  children,
}: ActionGroupProps): ReactElement {
  return (
    <div className={classNames(styles.actionGroup, className)}>{children}</div>
  );
}

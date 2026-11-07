import type { ReactElement } from 'react';

import { classNames } from '@/utils';

import styles from './badge.module.scss';
import type { BadgeProps } from './badge.types';

export function Badge({ variant, children }: BadgeProps): ReactElement {
  return (
    <span className={classNames(styles.badge, styles[variant])}>
      {children}
    </span>
  );
}

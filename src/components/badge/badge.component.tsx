import type { ReactElement } from 'react';

import { classNames } from '@/utils';

import styles from './badge.module.scss';
import type { BadgeProps } from './badge.types';

// A short label next to a title: a promotion in the career, the status of a project. The word
// carries the meaning, so the colour is never the only signal (WCAG 1.4.1).
export function Badge({ variant, children }: BadgeProps): ReactElement {
  return (
    <span className={classNames(styles.badge, styles[variant])}>
      {children}
    </span>
  );
}

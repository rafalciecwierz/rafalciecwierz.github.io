import type { ReactElement } from 'react';

import { classNames } from '@/utils';

import styles from './container.module.scss';
import type { ContainerProps } from './container.types';

export function Container({
  className,
  children,
}: ContainerProps): ReactElement {
  return (
    <div className={classNames(styles.container, className)}>{children}</div>
  );
}

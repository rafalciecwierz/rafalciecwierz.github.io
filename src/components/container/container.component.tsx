import type { ReactElement } from 'react';

import { classNames } from '@/utils';

import styles from './container.module.scss';
import type { ContainerProps } from './container.types';

// Keeps the content of a section to the page's maximum width, centred.
export function Container({
  className,
  children,
}: ContainerProps): ReactElement {
  return (
    <div className={classNames(styles.container, className)}>{children}</div>
  );
}

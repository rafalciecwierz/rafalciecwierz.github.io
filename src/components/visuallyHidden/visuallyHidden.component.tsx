import type { ReactElement } from 'react';

import styles from './visuallyHidden.module.scss';
import type { VisuallyHiddenProps } from './visuallyHidden.types';

export function VisuallyHidden({
  live,
  children,
}: VisuallyHiddenProps): ReactElement {
  return (
    <span className={styles.visuallyHidden} aria-live={live}>
      {children}
    </span>
  );
}

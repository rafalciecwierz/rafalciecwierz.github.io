import type { ReactElement } from 'react';

import styles from './visuallyHidden.module.scss';
import type { VisuallyHiddenProps } from './visuallyHidden.types';

// Text that screen readers announce but the eye does not see, e.g. the real text behind a
// title split into animated letters, or a status such as "Email address copied" (`live`).
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

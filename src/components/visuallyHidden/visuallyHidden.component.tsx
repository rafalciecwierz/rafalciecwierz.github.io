import type { ReactElement } from 'react';

import styles from './visuallyHidden.module.scss';
import type { VisuallyHiddenProps } from './visuallyHidden.types';

// Text that screen readers announce but the eye does not see, e.g. the real text behind a
// title split into animated letters, or the project name after a "Spot details" button.
export function VisuallyHidden({
  children,
}: VisuallyHiddenProps): ReactElement {
  return <span className={styles.visuallyHidden}>{children}</span>;
}

import type { ReactElement } from 'react';

import styles from './signOff.module.scss';
import type { SignOffProps } from './signOff.types';

// The last words of the page: "Session over." in the display font, and one line under it.
// A paragraph, not a heading: it closes the page rather than starting a part of it.
export function SignOff({ title, line }: SignOffProps): ReactElement {
  return (
    <div>
      <p className={styles.title}>{title}</p>
      <p className={styles.line}>{line}</p>
    </div>
  );
}

import type { ReactElement } from 'react';

import styles from './signOff.module.scss';
import type { SignOffProps } from './signOff.types';

export function SignOff({ title, line }: SignOffProps): ReactElement {
  return (
    <div>
      <p className={styles.title}>{title}</p>
      <p className={styles.line}>{line}</p>
    </div>
  );
}

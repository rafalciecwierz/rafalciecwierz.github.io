import type { ReactElement } from 'react';

import { TODO_MARKER } from './todo.constants';
import styles from './todo.module.scss';
import type { TodoProps } from './todo.types';

export function Todo({ children }: TodoProps): ReactElement {
  return (
    <span className={styles.todo}>
      <b className={styles.marker}>{TODO_MARKER}</b>
      {children}
    </span>
  );
}

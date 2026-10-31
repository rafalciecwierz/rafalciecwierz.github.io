import type { ReactElement } from 'react';

import { TODO_MARKER } from './todo.constants';
import styles from './todo.module.scss';
import type { TodoProps } from './todo.types';

// A visible gap where content is still missing (a `null` in the content layer). Inline, so it
// can stand in for a link in a row or sit inside a Text paragraph.
export function Todo({ children }: TodoProps): ReactElement {
  return (
    <span className={styles.todo}>
      <b className={styles.marker}>{TODO_MARKER}</b>
      {children}
    </span>
  );
}

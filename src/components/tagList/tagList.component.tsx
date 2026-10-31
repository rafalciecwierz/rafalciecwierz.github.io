import type { ReactElement } from 'react';

import styles from './tagList.module.scss';
import type { TagListProps } from './tagList.types';

// The small tags under a job or a project: the stack used there.
export function TagList({ tags, label }: TagListProps): ReactElement {
  return (
    <ul aria-label={label} className={styles.tagList}>
      {tags.map((tag: string): ReactElement => (
        <li key={tag} className={styles.tag}>
          {tag}
        </li>
      ))}
    </ul>
  );
}

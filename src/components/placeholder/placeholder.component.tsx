import type { ReactElement } from 'react';

import styles from './placeholder.module.scss';
import type { PlaceholderProps } from './placeholder.types';

// Temporary (task 3.2): proves that the scaffold renders, pre-renders and hydrates.
// Removed when the hero arrives (task 3.8). The <main> landmark is PageLayout's since task 3.7.
export function Placeholder({ profile }: PlaceholderProps): ReactElement {
  return (
    <div className={styles.placeholder}>
      <h1 className={styles.name}>{profile.name}</h1>
      <p>{profile.role}</p>
      <p>{profile.tagline}</p>
    </div>
  );
}

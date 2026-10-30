import type { ReactElement } from 'react';

import styles from './placeholder.module.scss';
import type { PlaceholderProps } from './placeholder.types';

// Temporary (task 3.2): proves that the scaffold renders, pre-renders and hydrates.
// Removed when the real page layout and hero arrive (tasks 3.7 and 3.8).
export function Placeholder({ profile }: PlaceholderProps): ReactElement {
  return (
    <main className={styles.placeholder}>
      <h1 className={styles.name}>{profile.name}</h1>
      <p>{profile.role}</p>
      <p>{profile.tagline}</p>
    </main>
  );
}

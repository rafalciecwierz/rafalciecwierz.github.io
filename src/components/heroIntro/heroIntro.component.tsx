import type { ReactElement } from 'react';

import styles from './heroIntro.module.scss';
import type { HeroIntroProps } from './heroIntro.types';

// The role under the sign and the one-line tagline. The role flip of the reference is motion
// (task 3.14); the static page reads the real role.
export function HeroIntro({ role, tagline }: HeroIntroProps): ReactElement {
  return (
    <div className={styles.heroIntro}>
      <p className={styles.role}>{role}</p>
      <p className={styles.tagline}>{tagline}</p>
    </div>
  );
}

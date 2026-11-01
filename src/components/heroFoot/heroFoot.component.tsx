import type { ReactElement } from 'react';

import styles from './heroFoot.module.scss';
import type { HeroFootProps } from './heroFoot.types';

// The row under the sign: the role and tagline, then the actions. Stacked on phones; side by
// side from 900px, the actions aligned to the bottom of the text.
export function HeroFoot({ children }: HeroFootProps): ReactElement {
  return <div className={styles.heroFoot}>{children}</div>;
}

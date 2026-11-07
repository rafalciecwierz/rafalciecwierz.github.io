import type { ReactElement } from 'react';

import styles from './heroFoot.module.scss';
import type { HeroFootProps } from './heroFoot.types';

export function HeroFoot({ children }: HeroFootProps): ReactElement {
  return <div className={styles.heroFoot}>{children}</div>;
}

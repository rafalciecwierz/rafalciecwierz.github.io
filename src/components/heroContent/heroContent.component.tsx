import type { ReactElement } from 'react';

import styles from './heroContent.module.scss';
import type { HeroContentProps } from './heroContent.types';

export function HeroContent({ children }: HeroContentProps): ReactElement {
  return <div className={styles.heroContent}>{children}</div>;
}

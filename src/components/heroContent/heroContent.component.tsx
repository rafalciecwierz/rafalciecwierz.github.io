import type { ReactElement } from 'react';

import styles from './heroContent.module.scss';
import type { HeroContentProps } from './heroContent.types';

// The hero's text, standing at the bottom of the screen above the parapet. It is the size
// container of the sign: the name's font size is a share of this box's width (cqi).
export function HeroContent({ children }: HeroContentProps): ReactElement {
  return <div className={styles.heroContent}>{children}</div>;
}

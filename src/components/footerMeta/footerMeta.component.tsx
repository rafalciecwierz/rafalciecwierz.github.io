import type { ReactElement } from 'react';

import styles from './footerMeta.module.scss';
import type { FooterMetaProps } from './footerMeta.types';

// The footer's small print, stacked: back to top, how the site is built, the year. Aligned
// left on phones and right from 900px, where it sits beside the sign-off.
export function FooterMeta({ children }: FooterMetaProps): ReactElement {
  return <div className={styles.footerMeta}>{children}</div>;
}

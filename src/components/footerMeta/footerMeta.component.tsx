import type { ReactElement } from 'react';

import styles from './footerMeta.module.scss';
import type { FooterMetaProps } from './footerMeta.types';

export function FooterMeta({ children }: FooterMetaProps): ReactElement {
  return <div className={styles.footerMeta}>{children}</div>;
}

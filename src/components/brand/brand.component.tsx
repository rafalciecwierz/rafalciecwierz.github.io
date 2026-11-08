import type { ReactElement } from 'react';

import styles from './brand.module.scss';
import type { BrandProps } from './brand.types';

export function Brand({
  href,
  initials,
  text,
  accessibleName,
}: BrandProps): ReactElement {
  return (
    <a href={href} className={styles.brand} aria-label={accessibleName}>
      <span className={styles.monogram}>{initials}</span>{' '}
      <span className={styles.label}>{text}</span>
    </a>
  );
}

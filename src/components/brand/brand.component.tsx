import type { ReactElement } from 'react';

import styles from './brand.module.scss';
import type { BrandProps } from './brand.types';

// The monogram on a sodium plate and the site label, linking back to the top. On phones only
// the monogram shows.
export function Brand({
  href,
  initials,
  text,
  accessibleName,
}: BrandProps): ReactElement {
  return (
    <a href={href} className={styles.brand} aria-label={accessibleName}>
      <span className={styles.monogram}>{initials}</span>
      {/* A space, so the text reads "RC Portfolio" like the accessible name (WCAG 2.5.3).
          The link is a flex box, so the space takes no room. */}{' '}
      <span className={styles.label}>{text}</span>
    </a>
  );
}

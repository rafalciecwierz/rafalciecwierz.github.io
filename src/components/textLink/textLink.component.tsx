import type { ReactElement } from 'react';

import styles from './textLink.module.scss';
import type { TextLinkProps } from './textLink.types';

export function TextLink({
  href,
  variant = 'inline',
  children,
  ...linkProps
}: TextLinkProps): ReactElement {
  return (
    <a {...linkProps} href={href} className={styles[variant]}>
      {children}
    </a>
  );
}

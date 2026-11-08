import type { ReactElement } from 'react';

import { Icon } from '@/components/icon';
import { classNames } from '@/utils';

import styles from './buttonLink.module.scss';
import type { ButtonLinkProps } from './buttonLink.types';

export function ButtonLink({
  href,
  variant,
  icon,
  shouldDownload = false,
  children,
  ...linkProps
}: ButtonLinkProps): ReactElement {
  return (
    <a
      {...linkProps}
      href={href}
      download={shouldDownload ? '' : undefined}
      className={classNames(styles.buttonLink, styles[variant])}
    >
      {icon !== undefined && <Icon name={icon} />}
      {children}
    </a>
  );
}

import type { ReactElement } from 'react';

import { Icon } from '@/components/icon';
import { classNames } from '@/utils';

import styles from './textLink.module.scss';
import type { TextLinkProps } from './textLink.types';

export function TextLink({
  href,
  variant = 'inline',
  icon,
  children,
  ...linkProps
}: TextLinkProps): ReactElement {
  return (
    <a
      {...linkProps}
      href={href}
      className={classNames(
        styles[variant],
        icon !== undefined && styles.withIcon,
      )}
    >
      {children}
      {icon !== undefined && <Icon name={icon} />}
    </a>
  );
}

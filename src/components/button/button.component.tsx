import type { ReactElement } from 'react';

import { Icon } from '@/components/icon';
import { classNames } from '@/utils';

import styles from './button.module.scss';
import type { ButtonProps } from './button.types';

export function Button({
  variant = 'outline',
  size = 'regular',
  icon,
  children,
  ...buttonProps
}: ButtonProps): ReactElement {
  return (
    <button
      {...buttonProps}
      type="button"
      className={classNames(styles.button, styles[variant], styles[size])}
    >
      {children}
      {icon !== undefined && <Icon name={icon} />}
    </button>
  );
}

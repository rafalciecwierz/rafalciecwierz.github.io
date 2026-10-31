import type { ReactElement } from 'react';

import { Icon } from '@/components/icon';
import { classNames } from '@/utils';

import styles from './button.module.scss';
import type { ButtonProps } from './button.types';

// A button that acts on the page: opens the menu or a project, copies the email, replays the
// leap. It is always type="button", so it can never submit a form by accident.
export function Button({
  variant = 'outline',
  icon,
  children,
  ...buttonProps
}: ButtonProps): ReactElement {
  return (
    <button
      {...buttonProps}
      type="button"
      className={classNames(styles.button, styles[variant])}
    >
      {children}
      {icon !== undefined && <Icon name={icon} />}
    </button>
  );
}

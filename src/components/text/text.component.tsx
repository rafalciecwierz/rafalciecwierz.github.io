import type { ReactElement } from 'react';

import { classNames } from '@/utils';

import styles from './text.module.scss';
import type { TextProps } from './text.types';

export function Text({
  variant = 'body',
  className,
  children,
}: TextProps): ReactElement {
  return <p className={classNames(styles[variant], className)}>{children}</p>;
}

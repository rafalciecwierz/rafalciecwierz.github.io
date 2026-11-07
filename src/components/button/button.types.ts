import type { ComponentProps, ReactNode } from 'react';

import type { IconName } from '@/components/icon';

export type ButtonVariant = 'outline' | 'strong' | 'solid';

export type ButtonSize = 'regular' | 'small';

export type ButtonProps = Omit<
  ComponentProps<'button'>,
  'className' | 'style' | 'type' | 'children'
> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconName;
  children: ReactNode;
};

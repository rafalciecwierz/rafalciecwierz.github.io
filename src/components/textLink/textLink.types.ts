import type { ComponentProps, ReactNode } from 'react';

import type { IconName } from '@/components/icon';

export type TextLinkVariant = 'inline' | 'cta';

export type TextLinkProps = Omit<
  ComponentProps<'a'>,
  'className' | 'style' | 'href' | 'children'
> & {
  href: string;
  variant?: TextLinkVariant;
  icon?: IconName;
  children: ReactNode;
};

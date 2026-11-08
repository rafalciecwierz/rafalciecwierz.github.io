import type { ComponentProps, ReactNode } from 'react';

import type { IconName } from '@/components/icon';

export type ButtonLinkVariant = 'primary' | 'secondary';

export type ButtonLinkProps = Omit<
  ComponentProps<'a'>,
  'className' | 'style' | 'href' | 'download' | 'children'
> & {
  href: string;
  variant: ButtonLinkVariant;
  icon?: IconName;
  shouldDownload?: boolean;
  children: ReactNode;
};

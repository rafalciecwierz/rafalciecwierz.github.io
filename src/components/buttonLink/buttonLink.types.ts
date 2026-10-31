import type { ComponentProps, ReactNode } from 'react';

import type { IconName } from '@/components/icon';

// primary: the main action of a block (Download CV), filled with sodium light. secondary: the
// action next to it (Get in touch), outlined.
export type ButtonLinkVariant = 'primary' | 'secondary';

// The other attributes of a link (aria-*, target, rel) pass through. The look comes only from
// the variant, so className and style are left out.
export type ButtonLinkProps = Omit<
  ComponentProps<'a'>,
  'className' | 'style' | 'href' | 'download' | 'children'
> & {
  href: string;
  variant: ButtonLinkVariant;
  // Shown before the label.
  icon?: IconName;
  // Saves the file instead of opening it (the CV).
  shouldDownload?: boolean;
  children: ReactNode;
};

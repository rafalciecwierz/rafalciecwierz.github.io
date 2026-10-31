import type { ComponentProps, ReactNode } from 'react';

import type { IconName } from '@/components/icon';

// outline: the usual look. solid: the same button, lit, e.g. "Copied" after copying the email.
export type ButtonVariant = 'outline' | 'solid';

// The other attributes of a button (onClick, aria-expanded, aria-controls, aria-haspopup) pass
// through. `type` is always "button", and the look comes only from the variant.
export type ButtonProps = Omit<
  ComponentProps<'button'>,
  'className' | 'style' | 'type' | 'children'
> & {
  variant?: ButtonVariant;
  // Shown after the label, e.g. an arrow on "Spot details".
  icon?: IconName;
  children: ReactNode;
};

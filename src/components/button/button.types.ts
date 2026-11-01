import type { ComponentProps, ReactNode } from 'react';

import type { IconName } from '@/components/icon';

// outline: the usual look. strong: a chalk outline for a button that stands alone in the
// header (Menu, Close). solid: lit, e.g. "Copied" after copying the email.
export type ButtonVariant = 'outline' | 'strong' | 'solid';

// The other attributes of a button (onClick, aria-expanded, aria-controls, aria-haspopup) pass
// through. `type` is always "button", and the look comes only from the variant.
// small: a compact button beside a line of text (Copy next to the email address).
export type ButtonSize = 'regular' | 'small';

export type ButtonProps = Omit<
  ComponentProps<'button'>,
  'className' | 'style' | 'type' | 'children'
> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  // Shown after the label, e.g. an arrow on "Spot details".
  icon?: IconName;
  children: ReactNode;
};

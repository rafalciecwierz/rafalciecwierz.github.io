import type { ComponentProps, ReactNode } from 'react';

// inline: a link inside text, with the site's link style (global.scss). cta: a short call to
// action on its own, in the display font with a sodium underline (Start the run, Back to top).
export type TextLinkVariant = 'inline' | 'cta';

export type TextLinkProps = Omit<
  ComponentProps<'a'>,
  'className' | 'style' | 'href' | 'children'
> & {
  href: string;
  variant?: TextLinkVariant;
  children: ReactNode;
};

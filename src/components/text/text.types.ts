import type { ReactNode } from 'react';

export type TextVariant = 'body' | 'lead' | 'muted';

export type TextProps = {
  variant?: TextVariant;
  className?: string | undefined;
  children: ReactNode;
};

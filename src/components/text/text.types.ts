import type { ReactNode } from 'react';

// body: ordinary text. lead: the larger reading text of About. muted: notes, sources, counts.
export type TextVariant = 'body' | 'lead' | 'muted';

export type TextProps = {
  variant?: TextVariant;
  // The spacing around the paragraph, from the parent's CSS Module.
  className?: string;
  children: ReactNode;
};

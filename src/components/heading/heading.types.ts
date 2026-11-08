import type { ReactNode } from 'react';

import type { HEADING_TAGS } from './heading.constants';

export type HeadingLevel = keyof typeof HEADING_TAGS;

export type HeadingTag = (typeof HEADING_TAGS)[HeadingLevel];

export type HeadingSize = 'sm' | 'md' | 'lg';

export type HeadingProps = {
  level: HeadingLevel;
  size: HeadingSize;
  id?: string;
  children: ReactNode;
};

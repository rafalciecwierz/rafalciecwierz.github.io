import type { ReactNode } from 'react';

import type { HEADING_TAGS } from './heading.constants';

export type HeadingLevel = keyof typeof HEADING_TAGS;

export type HeadingTag = (typeof HEADING_TAGS)[HeadingLevel];

// The display sizes headings share: sm for the leap and project titles, md for cards and
// boards, lg for the project panel.
export type HeadingSize = 'sm' | 'md' | 'lg';

export type HeadingProps = {
  // The level follows the outline of the page; the size is how it looks. They are separate,
  // so a heading can look small without skipping a level.
  level: HeadingLevel;
  size: HeadingSize;
  id?: string;
  children: ReactNode;
};

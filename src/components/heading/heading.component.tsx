import type { ReactElement } from 'react';

import { classNames } from '@/utils';

import { HEADING_TAGS } from './heading.constants';
import styles from './heading.module.scss';
import type { HeadingProps, HeadingTag } from './heading.types';

export function Heading({
  level,
  size,
  id,
  children,
}: HeadingProps): ReactElement {
  const Tag: HeadingTag = HEADING_TAGS[level];

  return (
    <Tag id={id} className={classNames(styles.heading, styles[size])}>
      {children}
    </Tag>
  );
}

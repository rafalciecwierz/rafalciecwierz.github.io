import type { ReactElement } from 'react';

import { MOTION_TARGETS } from '@/constants';
import { classNames, hashString, tornEdge } from '@/utils';

import styles from './poster.module.scss';
import type { PosterProps } from './poster.types';

export function Poster({
  quote,
  heading,
  number,
  caption,
  tone,
  tilt,
  isLead,
}: PosterProps): ReactElement {
  return (
    <figure
      className={classNames(styles.poster, styles[tone])}
      style={{ rotate: `${String(tilt)}deg` }}
      data-motion-target={MOTION_TARGETS.poster}
      data-tilt={tilt}
    >
      <div
        className={styles.sheet}
        style={{ clipPath: tornEdge(hashString(quote.author)) }}
      >
        <p className={styles.head} aria-hidden="true">
          <span>{heading}</span>
          <span>{number}</span>
        </p>
        <blockquote className={styles.quote}>
          {quote.paragraphs.map(
            (paragraph: string, index: number): ReactElement => (
              <p
                key={paragraph}
                className={classNames(isLead && index === 0 && styles.lead)}
              >
                {paragraph}
              </p>
            ),
          )}
        </blockquote>
        <figcaption className={styles.caption}>
          <strong className={styles.author}>{quote.author}</strong>
          <span className={styles.role}>{caption}</span>
        </figcaption>
      </div>
    </figure>
  );
}

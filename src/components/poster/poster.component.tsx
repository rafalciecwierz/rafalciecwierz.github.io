import type { ReactElement } from 'react';

import { classNames, hashString, tornEdge } from '@/utils';

import styles from './poster.module.scss';
import type { PosterProps } from './poster.types';

// A recommendation wheat-pasted on the concrete wall: quoted word for word, signed with the
// author's first name and surname initial (brief section 5.6). The torn edge is seeded by the
// author's name, so each poster keeps its own shape on every visit.
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

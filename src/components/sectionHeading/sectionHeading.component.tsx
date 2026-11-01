import type { ReactElement } from 'react';

import { KineticText } from '@/components/kineticText';
import { MOTION_TARGETS } from '@/constants';
import { classNames } from '@/utils';

import styles from './sectionHeading.module.scss';
import type { SectionHeadingProps } from './sectionHeading.types';
import { sectionNumber } from './sectionHeading.utils';

// The head of every section after the hero: the kicker (with the section's number), the big
// title split into letters for the motion layer, and an optional intro.
export function SectionHeading({
  heading,
  titleId,
  intro,
  size = 'regular',
}: SectionHeadingProps): ReactElement {
  const number: string | null = sectionNumber(heading);

  return (
    <div className={styles.sectionHeading}>
      <p className={styles.kicker}>
        {number !== null && <span className={styles.number}>{number}</span>}
        <span>{heading.kicker}</span>
      </p>
      <h2
        id={titleId}
        className={classNames(styles.title, styles[size])}
        data-motion-target={MOTION_TARGETS.vaultTitle}
      >
        <KineticText text={heading.title} />
      </h2>
      {intro !== undefined && <p className={styles.intro}>{intro}</p>}
    </div>
  );
}

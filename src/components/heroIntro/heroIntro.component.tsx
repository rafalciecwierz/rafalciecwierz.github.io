import { Fragment, type ReactElement } from 'react';

import { VisuallyHidden } from '@/components/visuallyHidden';
import { MOTION_TARGETS } from '@/constants';

import styles from './heroIntro.module.scss';
import type { HeroIntroProps } from './heroIntro.types';
import { taglineLines } from './heroIntro.utils';

export function HeroIntro({
  role,
  roleFlips,
  tagline,
}: HeroIntroProps): ReactElement {
  return (
    <div className={styles.heroIntro}>
      <p className={styles.role} translate="no">
        <VisuallyHidden>{role}</VisuallyHidden>
        <span aria-hidden="true" data-motion-target={MOTION_TARGETS.heroRole}>
          {role}
        </span>
        {roleFlips.map((title: string): ReactElement => (
          <span key={title} hidden data-motion-target={MOTION_TARGETS.roleFlip}>
            {title}
          </span>
        ))}
      </p>
      <p className={styles.tagline}>
        {taglineLines(tagline).map(
          (line: string, index: number): ReactElement => (
            <Fragment key={line}>
              {index > 0 && ' '}
              <span className={styles.taglineLine}>{line}</span>
            </Fragment>
          ),
        )}
      </p>
    </div>
  );
}

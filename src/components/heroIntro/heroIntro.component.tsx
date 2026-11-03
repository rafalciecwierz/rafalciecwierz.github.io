import { Fragment, type ReactElement } from 'react';

import { VisuallyHidden } from '@/components/visuallyHidden';
import { MOTION_TARGETS } from '@/constants';

import styles from './heroIntro.module.scss';
import type { HeroIntroProps } from './heroIntro.types';
import { taglineLines } from './heroIntro.utils';

// The role under the sign and the tagline. On phones the tagline is always two lines, split
// after its middle dot: left to wrap freely, it fitted one line in Barlow but not in the
// fallback font at about 410 px, so the hero jumped when Barlow arrived (task 3.16). The static page reads the real role.
// HeroMotion flips the visible role through the other titles once (RoleFlip), so the visible
// text is hidden from screen readers, which get the real role once, whole. The other titles
// are in the HTML but hidden, because a motion component takes no content props; it reads
// them from here.
export function HeroIntro({
  role,
  roleFlips,
  tagline,
}: HeroIntroProps): ReactElement {
  return (
    <div className={styles.heroIntro}>
      <p className={styles.role}>
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

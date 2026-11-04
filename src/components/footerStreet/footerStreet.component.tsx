import type { ReactElement } from 'react';

import { Runner } from '@/components/runner';
import { MOTION_TARGETS } from '@/constants';

import {
  LAMP_HEAD,
  LAMP_LIGHT_PATH,
  LAMP_POST_PATH,
  LAMP_VIEW_BOX,
  SQUIRREL_BODY_PATH,
  SQUIRREL_EYE,
  SQUIRREL_TAIL_PATH,
  SQUIRREL_TRANSFORM,
} from './footerStreet.constants';
import styles from './footerStreet.module.scss';
import type { FooterStreetProps } from './footerStreet.types';

// The street at the bottom of the page: a lamp with a squirrel on it, and the runner who has come down from the
// rooftops, facing the viewer with an arm up and a speech bubble. This is the last frame of
// his landing, and the whole scene for the static page and reduced motion; FooterMotion
// animates the drop, the roll and the wave. Decorative.
export function FooterStreet({
  bubble,
  ref,
  children,
}: FooterStreetProps): ReactElement {
  return (
    <div ref={ref} className={styles.street} aria-hidden="true">
      <svg className={styles.lamp} viewBox={LAMP_VIEW_BOX} focusable="false">
        <path className={styles.light} d={LAMP_LIGHT_PATH} />
        <path className={styles.post} d={LAMP_POST_PATH} />
        <rect className={styles.head} {...LAMP_HEAD} />
        <g className={styles.squirrel} transform={SQUIRREL_TRANSFORM}>
          <path d={SQUIRREL_TAIL_PATH} />
          <path d={SQUIRREL_BODY_PATH} />
          <circle className={styles.squirrelEye} {...SQUIRREL_EYE} />
        </g>
      </svg>
      <p
        className={styles.bubble}
        data-motion-target={MOTION_TARGETS.streetBubble}
      >
        {bubble}
      </p>
      <Runner
        pose="wave"
        tone="front"
        className={styles.runner}
        motionTarget={MOTION_TARGETS.streetRunner}
      />
      {children}
    </div>
  );
}

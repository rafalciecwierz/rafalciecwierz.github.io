import type { ReactElement } from 'react';

import { Runner } from '@/components/runner';

import {
  LAMP_HEAD,
  LAMP_LIGHT_PATH,
  LAMP_POST_PATH,
  LAMP_VIEW_BOX,
} from './footerStreet.constants';
import styles from './footerStreet.module.scss';
import type { FooterStreetProps } from './footerStreet.types';

// The street at the bottom of the page: a lamp, and the runner who has come down from the
// rooftops, facing the viewer with an arm up and a speech bubble. This is the last frame of
// his landing (task 3.12 animates the drop, the roll and the wave), and the whole scene for
// the static page and reduced motion. Decorative.
export function FooterStreet({ bubble }: FooterStreetProps): ReactElement {
  return (
    <div className={styles.street} aria-hidden="true">
      <svg className={styles.lamp} viewBox={LAMP_VIEW_BOX} focusable="false">
        <path className={styles.light} d={LAMP_LIGHT_PATH} />
        <path className={styles.post} d={LAMP_POST_PATH} />
        <rect className={styles.head} {...LAMP_HEAD} />
      </svg>
      <p className={styles.bubble}>{bubble}</p>
      <Runner pose="wave" tone="front" className={styles.runner} />
    </div>
  );
}

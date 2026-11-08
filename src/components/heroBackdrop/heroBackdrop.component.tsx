import type { ReactElement } from 'react';

import { Skyline } from '@/components/skyline';

import { FLOODLIGHTS, HERO_SKYLINE_SEED } from './heroBackdrop.constants';
import styles from './heroBackdrop.module.scss';

export function HeroBackdrop(): ReactElement {
  return (
    <div className={styles.backdrop} aria-hidden="true">
      <div className={styles.skyline}>
        <Skyline seed={HERO_SKYLINE_SEED} />
      </div>
      <div className={styles.cones}>
        {FLOODLIGHTS.map((light: string): ReactElement => (
          <span key={light} className={styles.cone} />
        ))}
      </div>
      <div className={styles.parapet}>
        {FLOODLIGHTS.map((light: string): ReactElement => (
          <span key={light} className={styles.lamp} />
        ))}
      </div>
    </div>
  );
}

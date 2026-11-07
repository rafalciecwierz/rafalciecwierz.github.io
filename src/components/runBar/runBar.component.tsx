import type { ReactElement } from 'react';

import { ButtonLink } from '@/components/buttonLink';
import { MOTION_TARGETS } from '@/constants';

import { PERCENT, PERCENT_DECIMALS } from './runBar.constants';
import styles from './runBar.module.scss';
import type { RunBarProps, RunTick } from './runBar.types';

export function RunBar({
  ticks,
  skipLabel,
  skipHref,
}: RunBarProps): ReactElement {
  return (
    <div className={styles.runBar}>
      <ButtonLink
        href={skipHref}
        variant="secondary"
        icon="arrowDown"
        data-motion-target={MOTION_TARGETS.careerSkip}
      >
        {skipLabel}
      </ButtonLink>
      <div className={styles.track} aria-hidden="true">
        <span
          className={styles.fill}
          data-motion-target={MOTION_TARGETS.careerBarFill}
        />
        {ticks.map((tick: RunTick): ReactElement => (
          <span
            key={tick.key}
            className={styles.tick}
            style={{
              left: `${(tick.at * PERCENT).toFixed(PERCENT_DECIMALS)}%`,
            }}
            data-motion-target={MOTION_TARGETS.careerTick}
          >
            {tick.label}
          </span>
        ))}
      </div>
    </div>
  );
}

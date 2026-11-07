import type { CSSProperties, ReactElement } from 'react';

import { CAREER_RUN_DISTANCE_PROPERTY } from '@/constants';

import { careerRunLayout } from './careerRunLayout.utils';
import styles from './careerRunScene.module.scss';
import type { RunTrackProps } from './careerRunScene.types';
import { roleCountsOf, runDistance } from './careerRunScene.utils';

export function RunTrack({ jobs, children }: RunTrackProps): ReactElement {
  const length: number = careerRunLayout(roleCountsOf(jobs)).line.length;
  const style: CSSProperties = {
    [CAREER_RUN_DISTANCE_PROPERTY]: runDistance(length),
  };

  return (
    <div className={styles.runTrack} style={style} data-career-run="">
      {children}
    </div>
  );
}

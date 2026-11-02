import type { CSSProperties, ReactElement } from 'react';

import { CAREER_RUN_DISTANCE_PROPERTY } from '@/constants';

import { careerRunLayout } from './careerRunLayout.utils';
import styles from './careerRunScene.module.scss';
import type { RunTrackProps } from './careerRunScene.types';
import { roleCountsOf, runDistance } from './careerRunScene.utils';

// The length of the career run, in the HTML (DECISIONS.md #010). It marks its part of the page
// with data-career-run and gives it the run's distance, worked out at build time from the
// number of roles, so CSS alone makes the run as tall as it scrolls when the career is the run
// (src/styles/_careerRun.scss). In the list, neither does anything.
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

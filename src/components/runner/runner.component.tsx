import type { ReactElement } from 'react';

import { classNames } from '@/utils';

import { POSES } from './runner.constants';
import styles from './runner.module.scss';
import type { RunnerBox, RunnerProps } from './runner.types';
import { runnerBox, solvePose, viewBoxAttribute } from './runner.utils';
import { RunnerFigure } from './runnerFigure.component';

export function Runner({
  pose,
  tone,
  className,
  motionTarget,
}: RunnerProps): ReactElement {
  const box: RunnerBox = runnerBox(solvePose(POSES[pose]));

  return (
    <svg
      className={classNames(styles.runner, className)}
      viewBox={viewBoxAttribute(box)}
      aria-hidden="true"
      focusable="false"
      data-motion-target={motionTarget}
    >
      <RunnerFigure pose={pose} tone={tone} />
    </svg>
  );
}

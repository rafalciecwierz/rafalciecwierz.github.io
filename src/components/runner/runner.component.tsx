import type { ReactElement } from 'react';

import { classNames } from '@/utils';

import { POSES } from './runner.constants';
import styles from './runner.module.scss';
import type { RunnerBox, RunnerProps } from './runner.types';
import { runnerBox, solvePose, viewBoxAttribute } from './runner.utils';
import { RunnerFigure } from './runnerFigure.component';

// The free-runner: a stick figure drawn from ten joint angles (a pose rig). Here it shows one
// pose, computed while rendering, so it is in the pre-rendered HTML. The motion layer later
// blends poses to make him jump (task 3.14). The viewBox fits the pose: the hip is centred and
// the bottom edge is the ground, so the parent places him by his feet. Decorative.
export function Runner({ pose, tone, className }: RunnerProps): ReactElement {
  const box: RunnerBox = runnerBox(solvePose(POSES[pose]));

  return (
    <svg
      className={classNames(styles.runner, className)}
      viewBox={viewBoxAttribute(box)}
      aria-hidden="true"
      focusable="false"
    >
      <RunnerFigure pose={pose} tone={tone} />
    </svg>
  );
}

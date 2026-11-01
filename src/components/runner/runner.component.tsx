import type { ReactElement } from 'react';

import { classNames } from '@/utils';

import {
  HEAD_RADIUS,
  LIMB_STROKE,
  POSES,
  TORSO_STROKE,
} from './runner.constants';
import styles from './runner.module.scss';
import type { RunnerBody, RunnerBox, RunnerProps } from './runner.types';
import {
  pointsAttribute,
  runnerBox,
  solvePose,
  viewBoxAttribute,
} from './runner.utils';

// The free-runner: a stick figure drawn from ten joint angles (a pose rig). Here it shows one
// pose, computed while rendering, so it is in the pre-rendered HTML. The motion layer later
// blends poses to make him jump (task 3.14). The far limbs are darker, for depth in profile.
// Decorative: the hero's meaning is all in its text.
export function Runner({ pose, className }: RunnerProps): ReactElement {
  const body: RunnerBody = solvePose(POSES[pose]);
  const box: RunnerBox = runnerBox(body);

  return (
    <svg
      className={classNames(styles.runner, className)}
      viewBox={viewBoxAttribute(box)}
      aria-hidden="true"
      focusable="false"
    >
      <g className={styles.far} strokeWidth={LIMB_STROKE}>
        <polyline points={pointsAttribute(body.farLeg)} />
        <polyline points={pointsAttribute(body.farArm)} />
      </g>
      <g className={styles.near}>
        <line
          x1={0}
          y1={0}
          x2={body.shoulder[0]}
          y2={body.shoulder[1]}
          strokeWidth={TORSO_STROKE}
        />
        <polyline
          points={pointsAttribute(body.nearLeg)}
          strokeWidth={LIMB_STROKE}
        />
        <polyline
          points={pointsAttribute(body.nearArm)}
          strokeWidth={LIMB_STROKE}
        />
        <circle
          cx={body.head[0]}
          cy={body.head[1]}
          r={HEAD_RADIUS}
          className={styles.head}
        />
      </g>
    </svg>
  );
}

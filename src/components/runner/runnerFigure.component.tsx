import type { ReactElement } from 'react';

import {
  HEAD_RADIUS,
  LIMB_STROKE,
  POSES,
  TORSO_STROKE,
} from './runner.constants';
import styles from './runner.module.scss';
import type { RunnerBody, RunnerFigureProps } from './runner.types';
import { pointsAttribute, solvePose } from './runner.utils';

// The figure itself, as an SVG group with the hip at (0, 0): for a scene that places him with a
// transform (the leap). Runner wraps it in its own <svg> for everywhere else. Each moving part
// is marked with `data-rig-part`, so RunnerRig can redraw it in every frame of a move.
export function RunnerFigure({
  pose,
  tone = 'profile',
}: RunnerFigureProps): ReactElement {
  const body: RunnerBody = solvePose(POSES[pose]);

  return (
    <g className={styles.figure}>
      <g className={styles[tone]} strokeWidth={LIMB_STROKE}>
        <polyline
          data-rig-part="farLeg"
          points={pointsAttribute(body.farLeg)}
        />
        <polyline
          data-rig-part="farArm"
          points={pointsAttribute(body.farArm)}
        />
      </g>
      <g className={styles.near}>
        <line
          data-rig-part="torso"
          x1={0}
          y1={0}
          x2={body.shoulder[0]}
          y2={body.shoulder[1]}
          strokeWidth={TORSO_STROKE}
        />
        <polyline
          data-rig-part="nearLeg"
          points={pointsAttribute(body.nearLeg)}
          strokeWidth={LIMB_STROKE}
        />
        <polyline
          data-rig-part="nearArm"
          points={pointsAttribute(body.nearArm)}
          strokeWidth={LIMB_STROKE}
        />
        <circle
          data-rig-part="head"
          cx={body.head[0]}
          cy={body.head[1]}
          r={HEAD_RADIUS}
          className={styles.head}
        />
      </g>
    </g>
  );
}

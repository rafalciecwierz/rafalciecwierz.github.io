import { type ReactElement, useId } from 'react';

import { Button } from '@/components/button';
import {
  POSES,
  type RunnerBox,
  runnerBox,
  RunnerFigure,
  solvePose,
} from '@/components/runner';
import { MOTION_TARGETS } from '@/constants';

import { LeapRoof } from './leapRoof.component';
import {
  FOG,
  LANDED,
  LANDING_ROOF,
  LEDGE,
  SCENE_HEIGHT,
  SCENE_WIDTH,
  TAKE_OFF_ROOF,
} from './leapScene.constants';
import styles from './leapScene.module.scss';
import type { LeapSceneProps, SceneRect } from './leapScene.types';
import { distantBuildings } from './leapScene.utils';

// "The leap": a gap jump from the known roof to one in the fog. This is the scene after the
// landing, the version for the static page and for reduced motion; ProcessMotion plays the
// jump itself, with bullet time at the apex. Decorative: the section's text says what it
// means. Everything but the replay button sits in a "camera" group, so the motion can zoom in.
export function LeapScene({
  signs,
  replayLabel,
  ref,
  children,
}: LeapSceneProps): ReactElement {
  const id: string = useId();
  const fogId: string = `${id}-fog`;
  // He stands on the landing roof's ledge, placed by his feet.
  const runner: RunnerBox = runnerBox(solvePose(POSES.stand));
  const feet: number = runner.minY + runner.height;
  const runnerPlace: string = `translate(${String(LANDED.x)} ${String(LANDING_ROOF.top - LEDGE.rise)}) scale(${String(LANDED.scale)}) translate(0 ${(-feet).toFixed(1)})`;

  return (
    <div ref={ref} className={styles.frame}>
      <svg
        className={styles.leapScene}
        viewBox={`0 0 ${String(SCENE_WIDTH)} ${String(SCENE_HEIGHT)}`}
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id={fogId}>
            <stop offset="0" className={styles.fogStop} stopOpacity="0" />
            <stop offset="0.3" className={styles.fogStop} stopOpacity="0.9" />
            <stop offset="1" className={styles.fogStop} stopOpacity="0.96" />
          </linearGradient>
        </defs>
        <g data-motion-target={MOTION_TARGETS.leapCamera}>
          {distantBuildings().map((building: SceneRect): ReactElement => (
            <rect
              key={building.key}
              className={styles.distant}
              x={building.x}
              y={building.y}
              width={building.width}
              height={building.height}
            />
          ))}
          <LeapRoof
            roof={TAKE_OFF_ROOF}
            sign={signs[0]}
            signAlign="end"
            patternId={`${id}-take-off`}
          />
          <LeapRoof
            roof={LANDING_ROOF}
            sign={signs[1]}
            signAlign="start"
            patternId={`${id}-landing`}
          />
          <rect
            className={styles.fog}
            {...FOG}
            fill={`url(#${fogId})`}
            data-motion-target={MOTION_TARGETS.leapFog}
          />
          <g
            transform={runnerPlace}
            data-motion-target={MOTION_TARGETS.leapRunner}
          >
            <RunnerFigure pose="stand" />
          </g>
        </g>
      </svg>
      {children}
      {/* Hidden until the motion layer has loaded: without it there is nothing to replay. */}
      <div
        className={styles.replay}
        data-motion-target={MOTION_TARGETS.leapReplay}
      >
        <Button>{replayLabel}</Button>
      </div>
    </div>
  );
}

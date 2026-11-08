import type { ReactElement } from 'react';

import { MOTION_TARGETS } from '@/constants';
import { classNames } from '@/utils';

import { SKYLINE_HEIGHT, SKYLINE_WIDTH } from './skyline.constants';
import styles from './skyline.module.scss';
import type {
  SkylineBuilding,
  SkylineDrawing,
  SkylineProps,
  SkylineWindow,
} from './skyline.types';
import { drawSkyline } from './skyline.utils';

export function Skyline({ seed, className }: SkylineProps): ReactElement {
  const { buildings, windows }: SkylineDrawing = drawSkyline(seed);

  return (
    <svg
      className={classNames(styles.skyline, className)}
      viewBox={`0 0 ${String(SKYLINE_WIDTH)} ${String(SKYLINE_HEIGHT)}`}
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      {buildings.map((building: SkylineBuilding): ReactElement => (
        <rect
          key={building.key}
          className={styles[building.layer]}
          x={building.x}
          y={building.y}
          width={building.width}
          height={building.height}
        />
      ))}
      {windows.map((window: SkylineWindow): ReactElement => (
        <rect
          key={window.key}
          className={classNames(
            styles.window,
            styles[`${window.tone}-${window.layer}`],
          )}
          x={window.x}
          y={window.y}
          width={window.width}
          height={window.height}
          data-motion-target={MOTION_TARGETS.skylineWindow}
        />
      ))}
    </svg>
  );
}

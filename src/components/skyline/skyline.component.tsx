import type { ReactElement } from 'react';

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

// The city at night behind the hero. Drawn from a seed while rendering, so it ships in the
// pre-rendered HTML and needs no script. `slice` keeps it filling the box at any width, cut at
// the sides, with the buildings standing on the bottom edge. Decorative.
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
        />
      ))}
    </svg>
  );
}

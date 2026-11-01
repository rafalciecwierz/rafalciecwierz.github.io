import { type ReactElement, useId } from 'react';

import { classNames } from '@/utils';

import {
  BODY,
  BUILDING_VIEW_HEIGHT,
  BUILDING_VIEW_WIDTH,
  ROOF,
  TOWER,
  TOWER_CAP,
  WINDOW,
} from './miniBuilding.constants';
import styles from './miniBuilding.module.scss';
import type {
  BuildingWindow,
  MiniBuildingProps,
  WindowArea,
} from './miniBuilding.types';
import {
  buildingPixels,
  buildingWindows,
  roofTop,
  windowArea,
} from './miniBuilding.utils';

// The small building beside a job in the career list: the newer the job, the higher the roof,
// and a promotion adds a tower lit in sodium. Seeded, so it is drawn at build time. Decorative.
export function MiniBuilding({
  height,
  hasTower,
}: MiniBuildingProps): ReactElement {
  const top: number = roofTop(height);
  const patternId: string = useId();
  const area: WindowArea = windowArea(height);

  return (
    <svg
      className={styles.miniBuilding}
      style={{ height: `${String(buildingPixels(height))}px` }}
      viewBox={`0 0 ${String(BUILDING_VIEW_WIDTH)} ${String(BUILDING_VIEW_HEIGHT)}`}
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern
          id={patternId}
          patternUnits="userSpaceOnUse"
          x={area.x}
          y={area.y}
          width={WINDOW.stepX}
          height={WINDOW.stepY}
        >
          <rect
            className={styles.dark}
            width={WINDOW.width}
            height={WINDOW.height}
          />
        </pattern>
      </defs>
      <rect
        className={styles.body}
        x={BODY.x}
        y={top}
        width={BODY.width}
        height={BUILDING_VIEW_HEIGHT - top}
      />
      <rect
        className={styles.roof}
        x={ROOF.x}
        y={top - ROOF.overhang}
        width={ROOF.width}
        height={ROOF.height}
      />
      {hasTower && (
        <>
          <rect
            className={styles.tower}
            x={TOWER.x}
            y={top - TOWER.rise}
            width={TOWER.width}
            height={TOWER.height}
          />
          <rect
            className={styles.towerCap}
            x={TOWER_CAP.x}
            y={top - TOWER_CAP.rise}
            width={TOWER_CAP.width}
            height={TOWER_CAP.height}
          />
        </>
      )}
      {/* The dark windows are one pattern; only the lit ones are elements of their own. */}
      <rect
        x={area.x}
        y={area.y}
        width={area.width}
        height={area.height}
        fill={`url(#${patternId})`}
      />
      {buildingWindows(height)
        .filter((window: BuildingWindow): boolean => window.isLit)
        .map((window: BuildingWindow): ReactElement => (
          <rect
            key={window.key}
            className={classNames(styles.lit, window.isDim && styles.dim)}
            x={window.x}
            y={window.y}
            width={WINDOW.width}
            height={WINDOW.height}
          />
        ))}
    </svg>
  );
}

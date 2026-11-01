import type { ReactElement } from 'react';

import { classNames, padNumber } from '@/utils';

import {
  MAIN_ROAD,
  MAP_SIZE,
  PIN_NUMBER_RISE,
  PIN_RING,
  RIVER_PATH,
} from './spotMap.constants';
import styles from './spotMap.module.scss';
import type { MapPoint, SpotMapProps, Street } from './spotMap.types';
import { mapStreets, zoomViewBox } from './spotMap.utils';

// The night map of the projects: a seeded street grid, a river, and one numbered pin per
// project. It is a picture of the list beside it, so it is hidden from screen readers; every
// action is on the cards. Pointing at a pin highlights its card, and the reverse.
export function SpotMap({
  pins,
  hotIndex,
  zoomIndex,
  onPinHover,
}: SpotMapProps): ReactElement {
  const zoomPin: MapPoint | undefined =
    zoomIndex === undefined ? undefined : pins[zoomIndex];

  return (
    <svg
      className={styles.spotMap}
      viewBox={
        zoomPin === undefined
          ? `0 0 ${String(MAP_SIZE)} ${String(MAP_SIZE)}`
          : zoomViewBox(zoomPin)
      }
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <path className={styles.river} d={RIVER_PATH} />
      {mapStreets().map((street: Street): ReactElement => (
        <line
          key={street.key}
          className={street.isAvenue ? styles.avenue : styles.street}
          x1={street.x1}
          y1={street.y1}
          x2={street.x2}
          y2={street.y2}
        />
      ))}
      <line className={styles.road} {...MAIN_ROAD} />
      {pins.map(([x, y]: MapPoint, index: number): ReactElement => (
        <g
          key={`${String(x)}-${String(y)}`}
          className={classNames(
            styles.pin,
            index === (zoomIndex ?? hotIndex) && styles.hot,
          )}
          onPointerEnter={(): void => onPinHover?.(index)}
          onPointerLeave={(): void => onPinHover?.(null)}
        >
          <circle
            className={styles.ring}
            cx={x}
            cy={y - PIN_RING.rise}
            r={PIN_RING.radius}
          />
          <path
            className={styles.drop}
            d={`M${String(x)} ${String(y)} l-12 -16 a15 15 0 1 1 24 0 Z`}
          />
          <text
            className={styles.number}
            x={x}
            y={y - PIN_NUMBER_RISE}
            textAnchor="middle"
          >
            {padNumber(index)}
          </text>
        </g>
      ))}
    </svg>
  );
}

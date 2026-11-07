import { type ReactElement, useId } from 'react';

import { classNames } from '@/utils';

import { ANTENNA, LEDGE, ROOF_BOX, WINDOW } from './careerRunScene.constants';
import styles from './careerRunScene.module.scss';
import type {
  FacadeWindows,
  RunFacadeProps,
  RunWindow,
} from './careerRunScene.types';
import { facadeWindows } from './careerRunScene.utils';

export function RunFacade({
  facade,
  isTop,
  bottom,
  seed,
}: RunFacadeProps): ReactElement {
  const patternId: string = useId();
  const windows: FacadeWindows = facadeWindows(facade, seed);
  const top: number = -facade.height;
  const ledgeX: number = facade.x - LEDGE.overhang;
  const ledgeWidth: number = facade.width + LEDGE.overhang + LEDGE.overhang;

  return (
    <g>
      <defs>
        <pattern
          id={patternId}
          patternUnits="userSpaceOnUse"
          x={windows.area.x}
          y={windows.area.y}
          width={WINDOW.stepX}
          height={WINDOW.stepY}
        >
          <rect
            className={styles.unlit}
            width={WINDOW.width}
            height={WINDOW.height}
          />
        </pattern>
      </defs>
      <rect
        className={styles.wall}
        x={facade.x}
        y={top}
        width={facade.width}
        height={bottom - top}
      />
      <rect
        className={styles.ledge}
        x={ledgeX}
        y={top - LEDGE.rise}
        width={ledgeWidth}
        height={LEDGE.height}
      />
      <rect
        className={styles.ledgeGlow}
        x={ledgeX}
        y={top - LEDGE.rise}
        width={ledgeWidth}
        height={LEDGE.glow}
      />
      <rect {...windows.area} fill={`url(#${patternId})`} />
      {windows.lit.map((window: RunWindow): ReactElement => (
        <rect
          key={window.key}
          className={classNames(styles.lit, !window.isWarm && styles.cool)}
          x={window.x}
          y={window.y}
          width={WINDOW.width}
          height={WINDOW.height}
        />
      ))}
      {isTop && (
        <>
          <rect
            className={styles.roofBox}
            x={facade.x + facade.width * ROOF_BOX.at}
            y={top - LEDGE.rise - ROOF_BOX.height}
            width={ROOF_BOX.width}
            height={ROOF_BOX.height}
          />
          <line
            className={styles.antenna}
            x1={facade.x + ANTENNA.inset}
            y1={top - LEDGE.rise}
            x2={facade.x + ANTENNA.inset}
            y2={top - LEDGE.rise - ANTENNA.height}
            strokeWidth={ANTENNA.width}
          />
        </>
      )}
    </g>
  );
}

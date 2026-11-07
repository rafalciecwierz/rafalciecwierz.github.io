import type { ReactElement } from 'react';

import { LEDGE, ROOF_BOTTOM, SIGN, WINDOW } from './leapScene.constants';
import styles from './leapScene.module.scss';
import type { LeapRoofProps, SceneRect } from './leapScene.types';
import { litWindows, windowArea } from './leapScene.utils';

export function LeapRoof({
  roof,
  sign,
  signAlign,
  patternId,
}: LeapRoofProps): ReactElement {
  const area: SceneRect = windowArea(roof);
  const ledgeWidth: number =
    roof.right - roof.left + LEDGE.overhang + LEDGE.overhang;

  return (
    <g>
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
            className={styles.unlit}
            width={WINDOW.width}
            height={WINDOW.height}
          />
        </pattern>
      </defs>
      <rect
        className={styles.roof}
        x={roof.left}
        y={roof.top}
        width={roof.right - roof.left}
        height={ROOF_BOTTOM - roof.top}
      />
      <rect
        className={styles.ledge}
        x={roof.left - LEDGE.overhang}
        y={roof.top - LEDGE.rise}
        width={ledgeWidth}
        height={LEDGE.height}
      />
      <rect
        className={styles.ledgeGlow}
        x={roof.left - LEDGE.overhang}
        y={roof.top - LEDGE.rise}
        width={ledgeWidth}
        height={LEDGE.glow}
      />
      <rect
        x={area.x}
        y={area.y}
        width={area.width}
        height={area.height}
        fill={`url(#${patternId})`}
      />
      {litWindows(roof, sign).map((window: SceneRect): ReactElement => (
        <rect
          key={window.key}
          className={styles.lit}
          x={window.x}
          y={window.y}
          width={window.width}
          height={window.height}
        />
      ))}
      <text
        className={styles.sign}
        x={
          signAlign === 'end' ? roof.right - SIGN.inset : roof.left + SIGN.inset
        }
        y={roof.top + SIGN.drop}
        textAnchor={signAlign}
        fontSize={SIGN.size}
        letterSpacing={SIGN.spacing}
      >
        {sign}
      </text>
    </g>
  );
}

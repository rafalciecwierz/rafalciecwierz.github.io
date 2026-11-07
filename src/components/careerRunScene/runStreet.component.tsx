import { type ReactElement, useId } from 'react';

import { LAMP } from './careerRunScene.constants';
import styles from './careerRunScene.module.scss';
import type { RunStreetProps } from './careerRunScene.types';

export function RunStreet({ box }: RunStreetProps): ReactElement {
  const glowId: string = useId();
  const right: number = box.minX + box.width;
  const lamps: number[] = [];
  for (let x: number = box.minX; x < right; x += LAMP.spacing) {
    lamps.push(x);
  }

  return (
    <g>
      <defs>
        <radialGradient id={glowId}>
          <stop
            offset="0"
            className={styles.glowStop}
            stopOpacity={LAMP.glowOpacity}
          />
          <stop offset="1" className={styles.glowEnd} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect
        className={styles.street}
        x={box.minX}
        y={0}
        width={box.width}
        height={box.minY + box.height}
      />
      {lamps.map((x: number): ReactElement => (
        <g key={x}>
          <circle
            cx={x + LAMP.reach}
            cy={-LAMP.height}
            r={LAMP.glowRadius}
            fill={`url(#${glowId})`}
          />
          <path
            className={styles.lampPost}
            d={`M${String(x)} 0 V${String(-LAMP.height)} Q${String(x)} ${String(-LAMP.height - LAMP.curve)} ${String(x + LAMP.reach)} ${String(-LAMP.height - LAMP.tipDrop)}`}
            strokeWidth={LAMP.postWidth}
          />
          <rect
            className={styles.lampHead}
            x={x + LAMP.reach - LAMP.headInset}
            y={-LAMP.height - LAMP.headDrop}
            width={LAMP.headWidth}
            height={LAMP.headHeight}
          />
        </g>
      ))}
    </g>
  );
}

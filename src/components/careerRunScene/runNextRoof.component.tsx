import type { ReactElement } from 'react';

import { craneOver } from './careerRunCrane.utils';
import { HALF, NEXT_ROOF } from './careerRunScene.constants';
import styles from './careerRunScene.module.scss';
import type { Crane, RunNextRoofProps } from './careerRunScene.types';

// The roof that is not built yet: a dashed outline in scaffolding, a tower crane lifting a
// beam over it, and its sign ("Next").
export function RunNextRoof({ roof, sign }: RunNextRoofProps): ReactElement {
  const top: number = -roof.height;
  const right: number = roof.x + roof.width;
  const crane: Crane = craneOver(roof);
  const floors: number[] = [];
  for (let y: number = top; y < 0; y += NEXT_ROOF.scaffoldStep) {
    floors.push(y);
  }

  return (
    <g>
      <rect
        className={styles.nextOutline}
        x={roof.x}
        y={top}
        width={roof.width}
        height={roof.height}
        strokeDasharray={NEXT_ROOF.dash}
      />
      {floors.map((y: number): ReactElement => (
        <line
          key={y}
          className={styles.scaffold}
          x1={roof.x}
          y1={y}
          x2={right}
          y2={y}
        />
      ))}
      <path className={styles.craneTies} d={crane.ties} />
      <path className={styles.craneLattice} d={crane.lattice} />
      <path className={styles.crane} d={crane.frame} />
      <rect className={styles.cranePart} {...crane.weight} />
      <rect className={styles.craneCab} {...crane.cab} />
      <path className={styles.hook} d={crane.rope} />
      <rect className={styles.cranePart} {...crane.trolley} />
      <rect className={styles.cranePart} {...crane.block} />
      <rect className={styles.craneLoad} {...crane.load} />
      <text
        className={styles.nextLabel}
        x={roof.x + roof.width * HALF}
        y={top + NEXT_ROOF.labelDrop}
        textAnchor="middle"
        fontSize={NEXT_ROOF.labelSize}
      >
        {sign}
      </text>
    </g>
  );
}

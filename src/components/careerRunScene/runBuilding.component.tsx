import type { ReactElement } from 'react';

import { formatPeriod } from '@/utils';

import {
  DATES,
  HALF,
  PLATE,
  SIGN,
  TOWER_LABEL,
} from './careerRunScene.constants';
import styles from './careerRunScene.module.scss';
import type { Facade, RunBuildingProps } from './careerRunScene.types';
import { RunFacade } from './runFacade.component';

export function RunBuilding({
  building,
  job,
  promotedLabel,
  bottom,
}: RunBuildingProps): ReactElement {
  const top: number = -building.height;
  const hasTowers: boolean = building.towers.length > 0;

  return (
    <g>
      <RunFacade
        facade={{
          x: building.x,
          width: hasTowers ? building.width : building.baseWidth,
          height: building.height,
        }}
        isTop={!hasTowers}
        bottom={bottom}
        seed={job.id}
      />
      {building.towers.map((tower: Facade, index: number): ReactElement => (
        <g key={tower.x}>
          <RunFacade
            facade={tower}
            isTop={index === building.towers.length - 1}
            bottom={bottom}
            seed={`${job.id}-${String(index)}`}
          />
          <text
            className={styles.towerLabel}
            x={tower.x + tower.width * HALF}
            y={-tower.height + TOWER_LABEL.drop}
            textAnchor="middle"
            fontSize={TOWER_LABEL.size}
            letterSpacing={TOWER_LABEL.spacing}
          >
            {promotedLabel}
          </text>
        </g>
      ))}
      <rect
        className={styles.plate}
        x={building.x + PLATE.inset}
        y={top + PLATE.drop}
        width={building.baseWidth - PLATE.inset - PLATE.inset}
        height={PLATE.height}
      />
      <text
        className={styles.sign}
        x={building.x + SIGN.x}
        y={top + SIGN.y}
        fontSize={SIGN.size}
        letterSpacing={SIGN.spacing}
      >
        {job.sign}
      </text>
      <text
        className={styles.dates}
        x={building.x + DATES.x}
        y={top + DATES.y}
        fontSize={DATES.size}
        letterSpacing={DATES.spacing}
      >
        {formatPeriod(job.period)}
      </text>
    </g>
  );
}

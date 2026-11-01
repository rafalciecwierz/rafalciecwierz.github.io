import type { ReactElement } from 'react';

import styles from './pointList.module.scss';
import type { PointListProps } from './pointList.types';

// What was done at a job, one point per line, each marked with a short sodium dash.
export function PointList({ points }: PointListProps): ReactElement {
  return (
    <ul className={styles.pointList}>
      {points.map((point: string): ReactElement => (
        <li key={point} className={styles.point}>
          {point}
        </li>
      ))}
    </ul>
  );
}

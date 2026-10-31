import type { ReactElement } from 'react';

import type { Stat } from '@/content';
import { classNames } from '@/utils';

import styles from './statList.module.scss';
import type { StatListProps } from './statList.types';

// Big numbers with their captions, e.g. "22+" and "years of parkour". A description list, so a
// screen reader reads each number together with what it counts.
export function StatList({
  stats,
  size = 'regular',
}: StatListProps): ReactElement {
  return (
    <dl className={classNames(styles.statList, styles[size])}>
      {stats.map((stat: Stat): ReactElement => (
        <div key={stat.label} className={styles.stat}>
          <dt className={styles.value}>{stat.value}</dt>
          <dd className={styles.label}>{stat.label}</dd>
        </div>
      ))}
    </dl>
  );
}

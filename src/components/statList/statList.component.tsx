import type { ReactElement } from 'react';

import type { Stat } from '@/content';
import { classNames } from '@/utils';

import styles from './statList.module.scss';
import type { StatListProps } from './statList.types';

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

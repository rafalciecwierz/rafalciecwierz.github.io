import type { ReactElement } from 'react';

import { useCurrentTime } from '@/hooks';

import styles from './heroMeta.module.scss';
import type { HeroMetaProps } from './heroMeta.types';

export function HeroMeta({ meta }: HeroMetaProps): ReactElement {
  const time: string | null = useCurrentTime();

  return (
    <ul className={styles.heroMeta}>
      <li className={styles.place}>{meta.place}</li>
      <li>{meta.session}</li>
      <li>{meta.spot}</li>
      <li className={styles.time}>{time}</li>
    </ul>
  );
}

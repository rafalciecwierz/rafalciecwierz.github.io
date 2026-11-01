import type { ReactElement } from 'react';

import { useCurrentTime } from '@/hooks';

import styles from './heroMeta.module.scss';
import type { HeroMetaProps } from './heroMeta.types';

// The small line above the sign, a list so screen readers keep its items apart: where, when and the reader's own time of night. The time
// differs per visitor, so it appears after hydration. It comes last in the line, and its slot
// is reserved from the first paint, so the line wraps the same before and after it appears.
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

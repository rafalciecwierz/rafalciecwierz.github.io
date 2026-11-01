import type { ReactElement } from 'react';

import styles from './channelRow.module.scss';
import type { ChannelRowProps } from './channelRow.types';

// One channel: its name on the left, the link (or a TODO) on the right; stacked on phones.
export function ChannelRow({ label, children }: ChannelRowProps): ReactElement {
  return (
    <li className={styles.channelRow}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{children}</span>
    </li>
  );
}

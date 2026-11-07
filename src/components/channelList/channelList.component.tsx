import type { ReactElement } from 'react';

import styles from './channelList.module.scss';
import type { ChannelListProps } from './channelList.types';

export function ChannelList({ children }: ChannelListProps): ReactElement {
  return <ul className={styles.channelList}>{children}</ul>;
}

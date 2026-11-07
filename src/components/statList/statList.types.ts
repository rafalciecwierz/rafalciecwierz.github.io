import type { Stat } from '@/content';

export type StatListSize = 'regular' | 'small';

export type StatListProps = {
  stats: readonly Stat[];
  size?: StatListSize;
};

import type { Stat } from '@/content';

// regular: the facts in About. small: the facts next to the leap scene.
export type StatListSize = 'regular' | 'small';

export type StatListProps = {
  // Each caption appears once in a list, so it is the key.
  stats: readonly Stat[];
  size?: StatListSize;
};

import type { ReactNode } from 'react';

export type MoveCardProps = {
  // The names of the moves this card covers: one, or two for a job with a promotion.
  marks: readonly string[];
  title: string;
  buildingHeight: number;
  hasTower: boolean;
  children: ReactNode;
};

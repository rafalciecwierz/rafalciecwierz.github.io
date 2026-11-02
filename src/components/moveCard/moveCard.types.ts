import type { ReactNode } from 'react';

export type MoveCardProps = {
  // The names of the moves this card covers: one, or two for a job with a promotion.
  marks: readonly string[];
  // The move the career run starts on, marked in the HTML (data-current) so the run's first
  // stage names only it before the motion has loaded. The motion moves the mark after that.
  currentMark?: number | undefined;
  title: string;
  buildingHeight: number;
  hasTower: boolean;
  children: ReactNode;
};

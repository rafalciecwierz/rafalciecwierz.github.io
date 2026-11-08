import type { ReactNode } from 'react';

export type MoveCardProps = {
  marks: readonly string[];
  currentMark?: number | undefined;
  title: string;
  buildingHeight: number;
  hasTower: boolean;
  children: ReactNode;
};

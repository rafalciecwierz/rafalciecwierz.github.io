import type { StackLevel } from '@/content';

export type BoardRow = {
  id: string;
  name: string;
  label: string;
  isHighlighted: boolean;
  tools: readonly string[];
};

export type LevelBoardProps = {
  level: StackLevel;
  titleId: string;
  title: string;
  description: string;
  count: string;
  rows: readonly BoardRow[];
};

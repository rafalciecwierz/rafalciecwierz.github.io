import type { StackLevel } from '@/content';

// One group's tools on a board, e.g. Frontend on the Strong board.
export type BoardRow = {
  id: string;
  name: string;
  // The accessible name of the row's list: "Frontend, strong".
  label: string;
  // The AI group gets a sodium accent.
  isHighlighted: boolean;
  tools: readonly string[];
};

export type LevelBoardProps = {
  level: StackLevel;
  titleId: string;
  title: string;
  description: string;
  // "9 tools"
  count: string;
  rows: readonly BoardRow[];
};

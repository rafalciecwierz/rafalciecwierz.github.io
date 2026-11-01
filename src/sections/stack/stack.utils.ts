import type { BoardRow } from '@/components';
import type { Stack, StackLevel, Tool, ToolGroup } from '@/content';

// The rows of one level's board: every group that has tools at that level, with only those
// tools, in the content's order. A group with none at this level is left off the board.
export function boardRows(stack: Stack, level: StackLevel): BoardRow[] {
  const levelLabel: string = stack.levels[level].label;
  return stack.groups
    .map((group: ToolGroup): BoardRow => ({
      id: group.id,
      name: group.name,
      label: stack.groupLabel(group.name, levelLabel),
      isHighlighted: group.isHighlighted,
      tools: group.tools
        .filter((tool: Tool): boolean => tool.level === level)
        .map((tool: Tool): string => tool.name),
    }))
    .filter((row: BoardRow): boolean => row.tools.length > 0);
}

// How many tools a board holds.
export function toolTotal(rows: readonly BoardRow[]): number {
  return rows.reduce(
    (total: number, row: BoardRow): number => total + row.tools.length,
    0,
  );
}

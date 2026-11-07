import type { BoardRow } from '@/components';
import type { Stack, StackLevel, Tool, ToolGroup } from '@/content';

// A group with no tools at this level is left off the board.
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

export function toolTotal(rows: readonly BoardRow[]): number {
  return rows.reduce(
    (total: number, row: BoardRow): number => total + row.tools.length,
    0,
  );
}

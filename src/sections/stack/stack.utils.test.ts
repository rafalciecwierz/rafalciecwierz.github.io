import { describe, expect, it } from 'vitest';

import type { BoardRow } from '@/components';
import type { Stack } from '@/content';

import { boardRows, toolTotal } from './stack.utils';

const STACK: Stack = {
  heading: { number: '02', kicker: 'Kit', title: 'Stack' },
  intro: 'Intro',
  levels: {
    strong: { label: 'Strong', description: 'Strong' },
    medium: { label: 'Medium', description: 'Medium' },
    low: { label: 'Low', description: 'Low' },
  },
  toolCount: (count: number): string => String(count),
  groupLabel: (group: string, level: string): string =>
    `${group}, ${level.toLowerCase()}`,
  ai: { title: 'AI', text: 'Text', link: 'Link' },
  groups: [
    {
      id: 'frontend',
      name: 'Frontend',
      isHighlighted: false,
      tools: [
        { name: 'React', level: 'strong' },
        { name: 'Next.js', level: 'medium' },
        { name: 'TypeScript', level: 'strong' },
      ],
    },
    {
      id: 'ai',
      name: 'AI',
      isHighlighted: true,
      tools: [{ name: 'Claude Code', level: 'medium' }],
    },
  ],
};

describe('boardRows', (): void => {
  it('keeps only the tools of the level, grouped as in the content', (): void => {
    const rows: BoardRow[] = boardRows(STACK, 'strong');

    expect(rows).toEqual([
      {
        id: 'frontend',
        name: 'Frontend',
        label: 'Frontend, strong',
        isHighlighted: false,
        tools: ['React', 'TypeScript'],
      },
    ]);
  });

  it('leaves out groups with no tools at that level', (): void => {
    expect(boardRows(STACK, 'low')).toEqual([]);
    expect(
      boardRows(STACK, 'medium').map((row: BoardRow): string => row.id),
    ).toEqual(['frontend', 'ai']);
  });
});

describe('toolTotal', (): void => {
  it('counts the tools on a board', (): void => {
    expect(toolTotal(boardRows(STACK, 'medium'))).toBe(2);
  });
});

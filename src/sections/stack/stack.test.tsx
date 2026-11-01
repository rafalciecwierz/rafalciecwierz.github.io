import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { Stack as StackContent } from '@/content';

import { Stack } from './stack.component';

const STACK: StackContent = {
  heading: { number: '02', kicker: 'Kit', title: 'Stack' },
  intro: 'Intro',
  levels: {
    strong: { label: 'Strong', description: 'Strong production experience' },
    medium: { label: 'Medium', description: 'Medium production experience' },
    low: { label: 'Low', description: 'Low production experience' },
  },
  toolCount: (count: number): string => `${String(count)} tools`,
  groupLabel: (group: string, level: string): string =>
    `${group}, ${level.toLowerCase()}`,
  ai: { title: 'AI in the loop', text: 'Text', link: 'How I work with AI' },
  groups: [
    {
      id: 'frontend',
      name: 'Frontend',
      isHighlighted: false,
      tools: [
        { name: 'React', level: 'strong' },
        { name: 'TypeScript', level: 'strong' },
        { name: 'Next.js', level: 'medium' },
        { name: 'React Native', level: 'low' },
      ],
    },
  ],
};

describe('Stack', (): void => {
  it('shows one board per level, each named by its level', (): void => {
    render(<Stack stack={STACK} />);

    expect(screen.getByRole('article', { name: 'Strong' })).toBeInTheDocument();
    expect(screen.getByRole('article', { name: 'Medium' })).toBeInTheDocument();
    expect(screen.getByRole('article', { name: 'Low' })).toBeInTheDocument();
  });

  it('lists the tools of a level in a named list, and counts them', (): void => {
    render(<Stack stack={STACK} />);

    const strong: HTMLElement = screen.getByRole('article', { name: 'Strong' });
    const list: HTMLElement = within(strong).getByRole('list', {
      name: 'Frontend, strong',
    });
    expect(within(list).getAllByRole('listitem')).toHaveLength(2);
    expect(within(strong).getByText('2 tools')).toBeInTheDocument();
  });

  it('links the AI band to the process section', (): void => {
    render(<Stack stack={STACK} />);

    expect(
      screen.getByRole('complementary', { name: 'AI in the loop' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'How I work with AI' }),
    ).toHaveAttribute('href', '#process');
  });
});

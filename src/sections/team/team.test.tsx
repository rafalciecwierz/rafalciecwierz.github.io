import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { Team as TeamContent } from '@/content';

import { Team } from './team.component';

const TEAM: TeamContent = {
  heading: { kicker: 'Spotters', title: 'From the team' },
  intro: 'Intro',
  posterHeading: 'From the team',
  source: 'Mood up, 2024',
  caption: (role: string, source: string): string => `${role} · ${source}`,
  quotes: [
    {
      id: 'a',
      author: 'Anna A.',
      role: 'Designer',
      paragraphs: ['A great leader.'],
    },
    {
      id: 'b',
      author: 'Bartek B.',
      role: 'Developer',
      paragraphs: ['Contagious enthusiasm.'],
    },
  ],
};

describe('Team', (): void => {
  it('quotes each recommendation word for word with its author and role', (): void => {
    render(<Team team={TEAM} />);

    expect(
      screen.getByRole('region', { name: 'From the team' }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole('figure')).toHaveLength(TEAM.quotes.length);
    expect(
      screen.getByText('A great leader.').closest('blockquote'),
    ).not.toBeNull();
    expect(screen.getByText('Bartek B.')).toBeInTheDocument();
    expect(screen.getByText('Developer · Mood up, 2024')).toBeInTheDocument();
  });
});

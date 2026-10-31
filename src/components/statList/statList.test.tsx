import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { StatList } from './statList.component';

describe('StatList', (): void => {
  it('pairs each number with its caption', (): void => {
    render(
      <StatList
        stats={[
          { value: '22+', label: 'years of parkour' },
          { value: '16', label: 'prototypes' },
        ]}
      />,
    );

    expect(
      screen
        .getAllByRole('term')
        .map((term: HTMLElement): string | null => term.textContent),
    ).toEqual(['22+', '16']);
    expect(
      screen
        .getAllByRole('definition')
        .map(
          (definition: HTMLElement): string | null => definition.textContent,
        ),
    ).toEqual(['years of parkour', 'prototypes']);
  });
});

import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { TagList } from './tagList.component';

describe('TagList', (): void => {
  it('is a named list with one item per tag', (): void => {
    render(<TagList label="Stack" tags={['React', 'TypeScript']} />);

    const list: HTMLElement = screen.getByRole('list', { name: 'Stack' });
    expect(
      within(list)
        .getAllByRole('listitem')
        .map((item: HTMLElement): string | null => item.textContent),
    ).toEqual(['React', 'TypeScript']);
  });
});

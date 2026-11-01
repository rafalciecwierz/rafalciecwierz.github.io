import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { About as AboutContent } from '@/content';

import { About } from './about.component';

const ABOUT: AboutContent = {
  heading: { number: '01', kicker: 'Warm-up', title: 'About' },
  paragraphs: ['First paragraph.', 'Second paragraph.'],
  facts: [
    { value: '5+', label: 'years' },
    { value: '6', label: 'developers led' },
  ],
};

describe('About', (): void => {
  it('is a region named by its title, with the text and the facts', (): void => {
    render(<About about={ABOUT} />);

    expect(screen.getByRole('region', { name: 'About' })).toHaveAttribute(
      'id',
      'about',
    );
    expect(screen.getByText('Second paragraph.')).toBeInTheDocument();
    expect(screen.getAllByRole('term')).toHaveLength(ABOUT.facts.length);
  });
});

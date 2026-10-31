import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SectionHeading } from './sectionHeading.component';

describe('SectionHeading', (): void => {
  it('shows the number, the kicker, the title as a level 2 heading and the intro', (): void => {
    render(
      <SectionHeading
        heading={{ number: '04', kicker: 'Career', title: 'The run' }}
        titleId="career-title"
        intro="Newest first."
      />,
    );

    expect(
      screen.getByRole('heading', { level: 2, name: 'The run' }),
    ).toHaveAttribute('id', 'career-title');
    expect(screen.getByText('04')).toBeInTheDocument();
    expect(screen.getByText('Career')).toBeInTheDocument();
    expect(screen.getByText('Newest first.')).toBeInTheDocument();
  });

  it('shows no number and no intro when the section has none', (): void => {
    const { container } = render(
      <SectionHeading
        heading={{ kicker: 'Spotters', title: 'From the team' }}
        titleId="t"
      />,
    );

    expect(container.querySelectorAll('p')).toHaveLength(1);
  });
});

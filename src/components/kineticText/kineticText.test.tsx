import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { KineticText } from './kineticText.component';

describe('KineticText', (): void => {
  it('gives a heading its text once, whole, not letter by letter', (): void => {
    render(
      <h2>
        <KineticText text="On the move" />
      </h2>,
    );

    expect(
      screen.getByRole('heading', { name: 'On the move' }),
    ).toBeInTheDocument();
  });

  it('renders one letter element per letter for the motion layer', (): void => {
    const { container } = render(<KineticText text="Ciećwierz go" />);

    expect(container.querySelectorAll('[data-kinetic-letter]')).toHaveLength(
      11,
    );
  });
});

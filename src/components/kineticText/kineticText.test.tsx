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

  // Browser translation rewrites text nodes, and on a title split into one span per letter it
  // mixed the letters up (Chrome with Google Translate on a phone, task 3.19). The letters stay
  // untranslated; the whole text for screen readers is still translated.
  it('keeps browser translation off the letters, not off the text for screen readers', (): void => {
    const { container } = render(<KineticText text="About" />);

    for (const letter of container.querySelectorAll('[data-kinetic-letter]')) {
      expect(letter.closest('[translate="no"]')).not.toBeNull();
    }
    expect(screen.getByText('About').closest('[translate="no"]')).toBeNull();
  });
});

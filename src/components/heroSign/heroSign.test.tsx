import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { HeroSign } from './heroSign.component';

const NAME: string = 'Rafał Ciećwierz';

describe('HeroSign', (): void => {
  it('is the page heading, named once with the whole name', (): void => {
    render(<HeroSign name={NAME} titleId="hero-name" perchLetter="Ł" />);

    expect(
      screen.getByRole('heading', { level: 1, name: NAME }),
    ).toHaveAttribute('id', 'hero-name');
  });

  it('draws one sign letter per letter, and the runner hidden from screen readers', (): void => {
    const { container } = render(
      <HeroSign name={NAME} titleId="hero-name" perchLetter="Ł" />,
    );

    expect(container.querySelectorAll('[data-sign-letter]')).toHaveLength(14);
    const runner: SVGSVGElement | null = container.querySelector('svg');
    expect(runner).not.toBeNull();
    expect(runner?.closest('[aria-hidden="true"]')).not.toBeNull();
  });

  it('leaves the runner out when the name has no perch letter', (): void => {
    const { container } = render(
      <HeroSign name="Test Name" titleId="t" perchLetter="Ł" />,
    );

    expect(container.querySelector('svg')).toBeNull();
  });
});

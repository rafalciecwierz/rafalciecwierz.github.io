import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { TextLink } from './textLink.component';

const LABEL: string = 'Start the run';

describe('TextLink', (): void => {
  it('is a link to its href, with its attributes passed through', (): void => {
    render(
      <TextLink href="#career" variant="cta" aria-current="location">
        {LABEL}
      </TextLink>,
    );

    const link: HTMLElement = screen.getByRole('link', { name: LABEL });
    expect(link).toHaveAttribute('href', '#career');
    expect(link).toHaveAttribute('aria-current', 'location');
  });
});

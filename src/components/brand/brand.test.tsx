import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Brand } from './brand.component';

const ACCESSIBLE_NAME: string = 'RC Portfolio, back to top';

describe('Brand', (): void => {
  it('has text that the accessible name starts with, words apart (WCAG 2.5.3)', (): void => {
    render(
      <Brand
        href="#top"
        initials="RC"
        text="Portfolio"
        accessibleName={ACCESSIBLE_NAME}
      />,
    );
    const link: HTMLElement = screen.getByRole('link', {
      name: ACCESSIBLE_NAME,
    });

    expect(ACCESSIBLE_NAME.startsWith(link.textContent)).toBe(true);
  });
});

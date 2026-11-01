import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { Brand, Nav } from '@/content';

import { SiteHeader } from './siteHeader.component';

const NAV: Nav = {
  skipToContent: 'Skip',
  label: 'Main',
  menu: 'Menu',
  close: 'Close',
  links: [{ sectionId: 'about', label: 'About' }],
};

const BRAND: Brand = {
  text: 'Portfolio',
  accessibleName: (initials: string, text: string): string =>
    `${initials} ${text}, back to top`,
};

describe('SiteHeader', (): void => {
  it('is the banner, with the brand linking to the top and the main navigation', (): void => {
    render(<SiteHeader nav={NAV} brand={BRAND} initials="RC" />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    // The accessible name starts with the visible text (WCAG 2.5.3).
    expect(
      screen.getByRole('link', { name: 'RC Portfolio, back to top' }),
    ).toHaveAttribute('href', '#top');
    expect(
      screen.getByRole('navigation', { name: 'Main' }),
    ).toBeInTheDocument();
  });
});

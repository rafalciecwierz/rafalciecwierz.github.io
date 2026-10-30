import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { Profile } from '@/content';

import { Placeholder } from './placeholder.component';

const PROFILE: Profile = {
  name: 'Test Name',
  role: 'Test Role',
  tagline: 'Test tagline',
};

describe('Placeholder', (): void => {
  it('shows the name as the page heading, with the role and the tagline', (): void => {
    render(<Placeholder profile={PROFILE} />);

    expect(
      screen.getByRole('heading', { level: 1, name: PROFILE.name }),
    ).toBeInTheDocument();
    expect(screen.getByText(PROFILE.role)).toBeInTheDocument();
    expect(screen.getByText(PROFILE.tagline)).toBeInTheDocument();
  });
});

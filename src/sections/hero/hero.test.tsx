import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { Hero as HeroContent } from '@/content';

import { Hero } from './hero.component';
import type { HeroProps } from './hero.types';

const PROFILE: HeroProps['profile'] = {
  name: 'Rafał Ciećwierz',
  role: 'Frontend Engineer',
  tagline: 'Tagline',
  cvUrl: '/cv.pdf',
};

const HERO: HeroContent = {
  meta: { place: 'Summit', session: 'Night session', spot: 'Rooftop' },
  downloadCv: 'Download CV',
  getInTouch: 'Get in touch',
  startClimb: 'Start the climb',
};

describe('Hero', (): void => {
  it('is the top region, named by the name, with the role and tagline', (): void => {
    render(<Hero profile={PROFILE} hero={HERO} />);

    const region: HTMLElement = screen.getByRole('region', {
      name: PROFILE.name,
    });
    expect(region).toHaveAttribute('id', 'top');
    expect(screen.getByText(PROFILE.role)).toBeInTheDocument();
    expect(screen.getByText(PROFILE.tagline)).toBeInTheDocument();
  });

  it('offers the CV as a download, the contact section and the career', (): void => {
    render(<Hero profile={PROFILE} hero={HERO} />);

    expect(screen.getByRole('link', { name: HERO.downloadCv })).toHaveAttribute(
      'download',
      '',
    );
    expect(screen.getByRole('link', { name: HERO.getInTouch })).toHaveAttribute(
      'href',
      '#contact',
    );
    expect(screen.getByRole('link', { name: HERO.startClimb })).toHaveAttribute(
      'href',
      '#career',
    );
  });

  it('shows the meta line, with the reader’s time added in the browser', (): void => {
    render(<Hero profile={PROFILE} hero={HERO} />);

    expect(screen.getByText(HERO.meta.place)).toBeInTheDocument();
    expect(screen.getByText(/^\d{2}:\d{2}/)).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { NotFound as NotFoundContent } from '@/content';

import { NotFound } from './notFound.component';

const NOT_FOUND: NotFoundContent = {
  kicker: 'Error 404',
  title: 'Lost.',
  text: 'Nothing here.',
  backHome: 'Go home',
};

describe('NotFound', (): void => {
  it('names the page with its only h1 and links back home', (): void => {
    render(<NotFound notFound={NOT_FOUND} homeUrl="/" />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Lost.',
    );
    expect(screen.getByRole('region', { name: 'Lost.' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Go home' })).toHaveAttribute(
      'href',
      '/',
    );
  });
});

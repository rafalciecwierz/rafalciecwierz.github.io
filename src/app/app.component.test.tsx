import {
  act,
  render,
  type RenderResult,
  waitFor,
} from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { setMediaMatches } from '@/test/matchMedia';

import { App } from './app.component';
import { NOT_FOUND_ROUTE } from './app.constants';

function isSmoothScrollOn(): boolean {
  return document.documentElement.classList.contains('lenis');
}

describe('App motion layer', (): void => {
  it('starts smooth scrolling after hydration when motion is allowed', async (): Promise<void> => {
    const { unmount }: RenderResult = render(<App route={NOT_FOUND_ROUTE} />);

    await waitFor((): void => {
      expect(isSmoothScrollOn()).toBe(true);
    });

    unmount();
    expect(isSmoothScrollOn()).toBe(false);
  });

  it('keeps native scrolling with reduced motion', async (): Promise<void> => {
    setMediaMatches(true);
    render(<App route={NOT_FOUND_ROUTE} />);
    await new Promise<void>((resolve: () => void): void => {
      setTimeout(resolve, 400);
    });

    expect(isSmoothScrollOn()).toBe(false);
  });

  it('stops smooth scrolling when the reader turns reduced motion on', async (): Promise<void> => {
    render(<App route={NOT_FOUND_ROUTE} />);
    await waitFor((): void => {
      expect(isSmoothScrollOn()).toBe(true);
    });

    act((): void => {
      setMediaMatches(true);
    });

    expect(isSmoothScrollOn()).toBe(false);
  });
});

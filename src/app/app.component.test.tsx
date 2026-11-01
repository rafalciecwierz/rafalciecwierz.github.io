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

// Lenis marks <html> with the class "lenis" while it runs smooth scrolling.
function isSmoothScrollOn(): boolean {
  return document.documentElement.classList.contains('lenis');
}

// The root motion layer, end to end: the real MotionLayer loads the real RootMotion chunk,
// which starts the real Lenis. The 404 page is used because it is the smallest page.
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
    // Longer than the idle fallback and the chunk load, so Lenis would have started by now.
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

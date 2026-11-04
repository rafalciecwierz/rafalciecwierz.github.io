import Lenis from 'lenis';
import { afterEach, describe, expect, it, type MockInstance, vi } from 'vitest';

import type * as lenisModule from './lenis';

// Imported in each test, not at the top: GSAP reads matchMedia when it loads, and the test
// setup installs matchMedia only before each test.
async function loadLenis(): Promise<typeof lenisModule> {
  return import('./lenis');
}

describe('jumpTo', (): void => {
  afterEach((): void => {
    vi.restoreAllMocks();
  });

  // A smooth scroll still easing out pulled the page back after a link's jump ("Skip the run",
  // task 3.19), so the jump goes through Lenis, which stops its own animation first.
  it('jumps through Lenis at once while smooth scrolling runs', async (): Promise<void> => {
    const { jumpTo, startSmoothScroll }: typeof lenisModule = await loadLenis();
    const scrollTo: MockInstance<Lenis['scrollTo']> = vi.spyOn(
      Lenis.prototype,
      'scrollTo',
    );
    const stop: () => void = startSmoothScroll();
    const target: HTMLElement = document.createElement('section');

    jumpTo(target);

    expect(scrollTo).toHaveBeenCalledWith(target, { immediate: true });
    stop();
  });

  it('leaves the jump to the browser when smooth scrolling is off', async (): Promise<void> => {
    const { jumpTo, startSmoothScroll }: typeof lenisModule = await loadLenis();
    const scrollTo: MockInstance<Lenis['scrollTo']> = vi.spyOn(
      Lenis.prototype,
      'scrollTo',
    );
    const stop: () => void = startSmoothScroll();
    stop();

    jumpTo(document.createElement('section'));

    expect(scrollTo).not.toHaveBeenCalled();
  });
});

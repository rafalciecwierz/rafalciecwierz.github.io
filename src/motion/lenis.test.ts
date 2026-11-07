import Lenis from 'lenis';
import { afterEach, describe, expect, it, type MockInstance, vi } from 'vitest';

import type * as lenisModule from './lenis';

async function loadLenis(): Promise<typeof lenisModule> {
  return import('./lenis');
}

describe('jumpTo', (): void => {
  afterEach((): void => {
    vi.restoreAllMocks();
  });

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

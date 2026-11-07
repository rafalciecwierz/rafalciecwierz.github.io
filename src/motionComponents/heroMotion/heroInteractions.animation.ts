import { gsap } from '@/motion/gsap';
import type { ContextSafe } from '@/motion/gsap.types';

import { GREETING, RESIZE_SETTLE_MS, SCAN_IDLE } from './heroMotion.constants';
import type { HeroRunner, RunnerParts } from './heroMotion.types';
import { createHeroRunner } from './heroRunner.animation';

function whenIdle(task: () => void): () => void {
  if ('requestIdleCallback' in window) {
    const handle: number = window.requestIdleCallback(task, {
      timeout: SCAN_IDLE.timeout,
    });
    return (): void => {
      window.cancelIdleCallback(handle);
    };
  }
  // TypeScript treats window as always having requestIdleCallback, so the fallback uses the
  // global timer functions.
  const timer: number = setTimeout(task, SCAN_IDLE.fallbackDelay);
  return (): void => {
    clearTimeout(timer);
  };
}

// The sign is measured once the font has loaded (the glyph scan needs the real font) and again
// after a resize. Returns the cleanup.
export function startHeroInteractions(
  parts: RunnerParts,
  contextSafe: ContextSafe,
): () => void {
  let runner: HeroRunner | null = null;
  let isStopped: boolean = false;
  let resizeTimer: number | undefined;
  let cancelScan: (() => void) | null = null;
  let greetingTimer: number | undefined;

  const letterClicks: (() => void)[] = parts.letters.map(
    (letter: HTMLElement): (() => void) =>
      (): void => {
        runner?.sendTo(parts.letters.indexOf(letter));
      },
  );
  function onRunnerClick(): void {
    runner?.playTrick();
  }
  function onResize(): void {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout((): void => {
      runner?.relayout();
    }, RESIZE_SETTLE_MS);
  }

  void document.fonts.ready.then((): void => {
    if (isStopped) {
      return;
    }
    const created: HeroRunner = createHeroRunner(parts, contextSafe);
    runner = created;
    created.relayout();
    // He waves once after the sign has lit, then the letters are scanned in an idle moment.
    greetingTimer = setTimeout((): void => {
      created.greet();
    }, GREETING.delayMs);
    cancelScan = whenIdle((): void => {
      created.prepare();
    });
    gsap.set(parts.letters, { cursor: 'pointer' });
    parts.letters.forEach((letter: HTMLElement, index: number): void => {
      const onClick: (() => void) | undefined = letterClicks[index];
      if (onClick !== undefined) {
        letter.addEventListener('click', onClick);
      }
    });
    parts.hit.addEventListener('click', onRunnerClick);
    window.addEventListener('resize', onResize);
  });

  return (): void => {
    isStopped = true;
    cancelScan?.();
    clearTimeout(greetingTimer);
    window.clearTimeout(resizeTimer);
    window.removeEventListener('resize', onResize);
    parts.hit.removeEventListener('click', onRunnerClick);
    parts.letters.forEach((letter: HTMLElement, index: number): void => {
      const onClick: (() => void) | undefined = letterClicks[index];
      if (onClick !== undefined) {
        letter.removeEventListener('click', onClick);
      }
    });
  };
}

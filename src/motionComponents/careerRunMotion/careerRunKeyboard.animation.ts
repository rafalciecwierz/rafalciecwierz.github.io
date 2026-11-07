import type { CareerRunLayout } from '@/components';
import type { ScrollTrigger } from '@/motion/gsap';
import { jumpTo } from '@/motion/lenis';

import { cardStage } from './careerRun.utils';
import { cardItem } from './careerRunCards.animation';
import type { RunTargets } from './careerRunMotion.types';
import { stageScroll } from './careerRunScroll.utils';

function skipTarget(skip: HTMLElement): HTMLElement | null {
  const hash: string = new URL(
    skip.getAttribute('href') ?? '',
    window.location.href,
  ).hash;
  return hash === '' ? null : document.getElementById(hash.slice(1));
}

// - Skip the run: Lenis smooth-scrolls every same-page link, which here would play the whole run
//   at speed, so the click is stopped before it reaches Lenis and the browser jumps instead.
//   jumpTo first stops a smooth scroll still easing out, which would pull that jump back.
// - Tab into a hidden card jumps the page to that card's stage, where it is shown.
export function startRunKeyboard(
  targets: RunTargets,
  trigger: ScrollTrigger,
  layout: CareerRunLayout,
  roleCounts: readonly number[],
): () => void {
  function handleSkipClick(event: MouseEvent): void {
    event.stopPropagation();
    const target: HTMLElement | null = skipTarget(targets.skip);
    if (target !== null) {
      jumpTo(target);
    }
  }

  function handleFocusIn(event: FocusEvent): void {
    const card: number = targets.moves.findIndex(
      // The list item, not only the card: a long card's item scrolls, so it takes focus too.
      (move: HTMLElement): boolean =>
        event.target instanceof Node && cardItem(move).contains(event.target),
    );
    if (card < 0) {
      return;
    }
    window.scrollTo({
      top: stageScroll(
        trigger.start,
        trigger.end,
        layout,
        cardStage(roleCounts, card),
      ),
      behavior: 'instant',
    });
  }

  const list: HTMLElement | null | undefined = targets.moves[0]?.closest('ol');
  targets.skip.addEventListener('click', handleSkipClick);
  list?.addEventListener('focusin', handleFocusIn);
  return (): void => {
    targets.skip.removeEventListener('click', handleSkipClick);
    list?.removeEventListener('focusin', handleFocusIn);
  };
}

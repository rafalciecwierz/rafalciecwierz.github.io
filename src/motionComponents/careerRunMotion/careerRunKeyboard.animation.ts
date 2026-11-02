import type { CareerRunLayout } from '@/components';
import type { ScrollTrigger } from '@/motion/gsap';

import { cardStage } from './careerRun.utils';
import { cardItem } from './careerRunCards.animation';
import type { RunTargets } from './careerRunMotion.types';
import { stageScroll } from './careerRunScroll.utils';

// The run with a keyboard. Returns the function that removes the listeners.
// - Skip the run: a plain jump to the next section. Lenis smooth-scrolls every same-page link,
//   which here would play the whole run at speed; stopping the click before it reaches Lenis
//   (it listens on the window) leaves the browser's own jump, which also moves the focus.
// - Tab into a card: the run shows one card at a time, so focusing a hidden one (the next
//   roof's "Get in touch", or a long card that scrolls) jumps the page to that card's stage,
//   where it is shown.
export function startRunKeyboard(
  targets: RunTargets,
  trigger: ScrollTrigger,
  layout: CareerRunLayout,
  roleCounts: readonly number[],
): () => void {
  function handleSkipClick(event: MouseEvent): void {
    event.stopPropagation();
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

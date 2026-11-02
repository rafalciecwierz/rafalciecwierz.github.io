import { MOTION_TARGETS } from '@/constants';
import { gsap } from '@/motion/gsap';
import { motionTargets } from '@/motion/motionTarget';

import { CARD, CURRENT_MARK } from './careerRun.constants';
import { firstStages, stageCard } from './careerRun.utils';
import type { RunTargets, StageCard } from './careerRunMotion.types';

// The list item that holds a card: the run moves and fades the item, not the card inside it.
// The item scrolls when its card is too tall for a short window, and a card moved inside it
// would count as overflow, making every hidden item scrollable (and a stop for Tab).
export function cardItem(move: HTMLElement): HTMLElement {
  return move.closest('li') ?? move;
}

// The roles of each job, oldest first, counted from the move names on its card (one per
// role). The cards are newest first after the next roof's.
export function roleCountsOf(moves: readonly HTMLElement[]): number[] {
  return moves
    .slice(1)
    .map(
      (move: HTMLElement): number =>
        motionTargets(move, MOTION_TARGETS.careerMark).length,
    )
    .reverse();
}

// Returns the function that shows the card of a stage: the card comes in, the others leave,
// a promoted job names only the move he is on and dims its promotion until he reaches the
// tower, and the bar's ticks light up to here. It does nothing while the stage is the same,
// unless `shouldForce` asks to apply it again: ScrollTrigger reverts what was set before a
// refresh, so the run shows its stage again after each one.
export function createStageSwitcher(
  targets: RunTargets,
  roleCounts: readonly number[],
): (stage: number, shouldForce: boolean) => void {
  const tickStages: number[] = firstStages(roleCounts);
  // Every card starts faded out below, the first stage's too (CSS hides it only until the
  // motion is live), so the first switch brings the right one in.
  let shown: number = -1;
  gsap.set(targets.moves.map(cardItem), {
    opacity: 0,
    y: CARD.drop,
    pointerEvents: 'none',
  });

  return (stage: number, shouldForce: boolean): void => {
    if (stage === shown && !shouldForce) {
      return;
    }
    shown = stage;
    const { card, role }: StageCard = stageCard(roleCounts, stage);
    targets.moves.forEach((move: HTMLElement, index: number): void => {
      const isActive: boolean = index === card;
      const marks: HTMLElement[] = motionTargets(
        move,
        MOTION_TARGETS.careerMark,
      );
      // The card's CSS shows only the current move name; a card without one (not shown)
      // keeps all its names, so a screen reader still hears every move of the job.
      marks.forEach((mark: HTMLElement, markIndex: number): void => {
        mark.toggleAttribute(CURRENT_MARK, isActive && markIndex === role);
      });
      gsap.to(cardItem(move), {
        opacity: isActive ? 1 : 0,
        y: isActive ? 0 : CARD.drop,
        pointerEvents: isActive ? 'auto' : 'none',
        duration: isActive ? CARD.inDuration : CARD.outDuration,
        ease: isActive ? CARD.ease : 'power1.out',
        overwrite: true,
      });
      if (!isActive) {
        return;
      }
      // Only a promoted job has a promotion to dim (GSAP warns about an empty target list).
      const promotion: HTMLElement[] = motionTargets(
        move,
        MOTION_TARGETS.careerPromotion,
      );
      if (promotion.length > 0) {
        const isWaiting: boolean = role < marks.length - 1;
        gsap.set(promotion, {
          opacity: isWaiting ? CARD.waitOpacity : 1,
          filter: isWaiting ? CARD.waitFilter : 'none',
        });
      }
    });
    targets.ticks.forEach((tick: HTMLElement, index: number): void => {
      tick.toggleAttribute('data-reached', (tickStages[index] ?? 0) <= stage);
    });
  };
}

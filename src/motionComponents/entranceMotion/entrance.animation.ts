import { MOTION_TARGETS } from '@/constants';
import { gsap } from '@/motion/gsap';
import type { PercentKeyframes } from '@/motion/keyframes.types';
import { motionTargets } from '@/motion/motionTarget';

import {
  BOARD_REVEAL,
  KINETIC_LETTER_SELECTOR,
  PASTE_UP,
  VAULT,
} from './entrance.constants';
import { pasteUpKeyframes, vaultKeyframes, vaultStart } from './entrance.utils';

// Only opacity, never visibility: a transparent element stays in the accessibility tree and in
// the browser's find, so a screen reader can read ahead of the scroll.

export function createVault(
  title: HTMLElement,
  letters: HTMLElement[],
): gsap.core.Tween {
  // One measurement per title: GSAP gets pixels and does not have to convert em per letter.
  const fontSize: number = parseFloat(getComputedStyle(title).fontSize);
  gsap.set(letters, vaultStart(fontSize));
  return gsap.to(letters, {
    keyframes: vaultKeyframes(fontSize),
    duration: VAULT.duration,
    ease: VAULT.ease,
    stagger: VAULT.stagger,
    scrollTrigger: { trigger: title, start: VAULT.triggerStart, once: true },
  });
}

export function createBoardReveal(
  board: HTMLElement,
  chips: HTMLElement[],
): gsap.core.Tween {
  return gsap.fromTo(
    chips,
    { opacity: 0, y: BOARD_REVEAL.rise },
    {
      opacity: 1,
      y: 0,
      duration: BOARD_REVEAL.duration,
      ease: BOARD_REVEAL.ease,
      stagger: BOARD_REVEAL.stagger,
      scrollTrigger: {
        trigger: board,
        start: BOARD_REVEAL.triggerStart,
        once: true,
      },
    },
  );
}

// `index` is its place on the wall, so posters that come into view together land in turn.
export function createPasteUp(
  poster: HTMLElement,
  tilt: number,
  index: number,
): gsap.core.Tween {
  const keyframes: PercentKeyframes = pasteUpKeyframes(tilt);
  gsap.set(poster, keyframes['0%'] ?? {});
  return gsap.to(poster, {
    keyframes,
    duration: PASTE_UP.duration,
    delay: index * PASTE_UP.delayPerPoster,
    ease: PASTE_UP.ease,
    scrollTrigger: {
      trigger: poster,
      start: PASTE_UP.triggerStart,
      once: true,
    },
  });
}

export function lettersOf(title: Element): HTMLElement[] {
  return [...title.querySelectorAll<HTMLElement>(KINETIC_LETTER_SELECTOR)];
}

export function chipsOf(board: Element): HTMLElement[] {
  return motionTargets(board, MOTION_TARGETS.boardChip);
}

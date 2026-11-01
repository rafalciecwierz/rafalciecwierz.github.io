import { MOTION_TARGETS } from '@/constants';
import { useGSAP } from '@/motion/gsap';
import { saveInlineStyles } from '@/motion/inlineStyles';
import type { MotionComponentProps } from '@/motion/motionLayer';
import { isBelowViewport, motionTargets } from '@/motion/motionTarget';

import {
  chipsOf,
  createBoardReveal,
  createPasteUp,
  createVault,
  lettersOf,
} from './entrance.animation';
import { tiltOf } from './entrance.utils';

// The entrances of one section (docs/ARCHITECTURE.md section 9): its title vaults in letter by
// letter, its stack boards' tools rise in a stagger, and its posters are pasted on the wall,
// each once, as it comes into view. Section mounts it for every section, and it animates
// whatever of these its section has. An element already on screen when the layer loads keeps
// its final state, so motion never hides what the reader can see. Unmounting (reduced motion
// turned on) reverts every element to the static page. It draws nothing.
export function EntranceMotion({ scope }: MotionComponentProps): null {
  useGSAP((): (() => void) | undefined => {
    const section: HTMLElement | null | undefined = scope?.current;
    if (section === null || section === undefined) {
      return undefined;
    }
    const titles: HTMLElement[] = motionTargets(
      section,
      MOTION_TARGETS.vaultTitle,
    ).filter(isBelowViewport);
    const boards: HTMLElement[] = motionTargets(
      section,
      MOTION_TARGETS.board,
    ).filter(isBelowViewport);
    const posters: HTMLElement[] = motionTargets(
      section,
      MOTION_TARGETS.poster,
    );
    const restoreStyles: () => void = saveInlineStyles([
      ...titles.flatMap(lettersOf),
      ...boards.flatMap(chipsOf),
      ...posters,
    ]);

    for (const title of titles) {
      createVault(title, lettersOf(title));
    }
    for (const board of boards) {
      createBoardReveal(board, chipsOf(board));
    }
    // A poster keeps its place on the wall (index) for the delay, even when an earlier one
    // was already on screen.
    posters.forEach((poster: HTMLElement, index: number): void => {
      if (isBelowViewport(poster)) {
        createPasteUp(poster, tiltOf(poster.dataset.tilt), index);
      }
    });

    // Runs after GSAP has reverted its tweens.
    return restoreStyles;
  }, []);

  return null;
}

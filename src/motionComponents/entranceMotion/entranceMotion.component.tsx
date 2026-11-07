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
    posters.forEach((poster: HTMLElement, index: number): void => {
      if (isBelowViewport(poster)) {
        createPasteUp(poster, tiltOf(poster.dataset.tilt), index);
      }
    });

    return restoreStyles;
  }, []);

  return null;
}

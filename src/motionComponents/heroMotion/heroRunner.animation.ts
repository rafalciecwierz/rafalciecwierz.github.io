import { POSES } from '@/components';
import { gsap } from '@/motion/gsap';
import type { ContextSafe } from '@/motion/gsap.types';

import { createGreeting } from './greeting.animation';
import { fitOverlay, placeHit, staticRunnerSpot } from './heroLayout.animation';
import { TRICK_ORDER } from './heroMotion.constants';
import type {
  HeroRunner,
  Platform,
  RigSpot,
  RunnerParts,
  Trick,
  TrickMove,
} from './heroMotion.types';
import { createJump, measurePlatforms } from './letterHop.animation';
import { rigScale, stateAt } from './letterHop.utils';
import { createTrick } from './tricks.animation';

// Until his first move the static runner stands on the Ł; the first move hands over to the rig
// at exactly that spot, and the rig stays from then on.
export function createHeroRunner(
  parts: RunnerParts,
  contextSafe: ContextSafe,
): HeroRunner {
  let platforms: Platform[] = [];
  let scale: number = 1;
  let at: number = parts.perchIndex;
  let facing: RigSpot['facing'] = 1;
  let isBusy: boolean = false;
  let trick: number = 0;

  function spot(): RigSpot {
    const platform: Platform = platforms[at] ?? { x: 0, y: 0 };
    return { x: platform.x, y: platform.y, scale, facing };
  }

  let isMeasured: boolean = false;
  // Where the static runner stands, from his box: the greeting happens there, before any scan.
  let staticSpot: RigSpot = { x: 0, y: 0, scale, facing: 1 };

  // The glyph scan waits for an idle moment or the first click, so the mount adds no canvas work
  // while the page is still loading.
  function placeOnStaticRunner(): void {
    const box: DOMRect = fitOverlay(parts.hero, parts.overlay);
    staticSpot = staticRunnerSpot(
      box,
      parts.staticRunner,
      parts.letters[0],
      scale,
    );
    scale = staticSpot.scale;
    placeHit(parts.hit, staticSpot.x, staticSpot.y, scale);
  }

  function measure(): void {
    fitOverlay(parts.hero, parts.overlay);
    const measured: ReturnType<typeof measurePlatforms> = measurePlatforms(
      parts.hero,
      parts.letters,
    );
    platforms = measured.platforms;
    scale = rigScale(measured.fontPx);
    isMeasured = true;
    const { x, y } = spot();
    parts.rig.set(stateAt(spot(), POSES.crouch));
    placeHit(parts.hit, x, y, scale);
  }

  // Scans the letters once; later moves reuse the result until a resize.
  function prepare(): void {
    if (!isMeasured) {
      measure();
    }
  }

  function relayout(): void {
    if (isMeasured) {
      measure();
    } else {
      placeOnStaticRunner();
    }
  }

  let hasMoved: boolean = false;
  const takeOver: () => void = contextSafe((): void => {
    hasMoved = true;
    gsap.set(parts.staticRunner, { autoAlpha: 0 });
    gsap.set(parts.rigBox, { autoAlpha: 1 });
  });

  const play: (move: gsap.core.Timeline, landsOn: number) => void = contextSafe(
    (move: gsap.core.Timeline, landsOn: number): void => {
      move.eventCallback('onComplete', (): void => {
        at = landsOn;
        isBusy = false;
        const { x, y } = spot();
        placeHit(parts.hit, x, y, scale);
      });
    },
  );

  const sendTo: (index: number) => void = contextSafe((index: number): void => {
    prepare();
    const target: Platform | undefined = platforms[index];
    if (isBusy || index === at || target === undefined) {
      return;
    }
    isBusy = true;
    takeOver();
    const from: RigSpot = spot();
    if (target.x !== from.x) {
      facing = target.x > from.x ? 1 : -1;
    }
    play(createJump(parts.rig, { ...from, facing }, target), index);
  });

  // Every click on him plays the next trick, in the reference's order.
  const playTrick: () => void = contextSafe((): void => {
    if (isBusy) {
      return;
    }
    prepare();
    isBusy = true;
    takeOver();
    const kind: Trick | undefined = TRICK_ORDER[trick % TRICK_ORDER.length];
    trick += 1;
    if (kind === undefined) {
      return;
    }
    const {
      move,
      landsOn,
      facing: facesAfter,
    }: TrickMove = createTrick(kind, parts.rig, spot(), platforms, at);
    facing = facesAfter;
    play(move, landsOn);
  });

  // Only before any other move: its last frame is the static runner's crouch.
  const greet: () => void = contextSafe((): void => {
    if (isBusy || hasMoved) {
      return;
    }
    isBusy = true;
    parts.rig.set(stateAt(staticSpot, POSES.crouch));
    gsap.set(parts.staticRunner, { autoAlpha: 0 });
    gsap.set(parts.rigBox, { autoAlpha: 1 });
    createGreeting(parts.rig, staticSpot, parts.setTone).eventCallback(
      'onComplete',
      (): void => {
        gsap.set(parts.staticRunner, { autoAlpha: 1 });
        gsap.set(parts.rigBox, { autoAlpha: 0 });
        isBusy = false;
      },
    );
  });

  return { sendTo, playTrick, relayout, prepare, greet };
}

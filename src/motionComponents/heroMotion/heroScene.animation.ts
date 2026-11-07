import { gsap, ScrollTrigger } from '@/motion/gsap';
import { progressTween } from '@/motion/progressTween';

import {
  ROLE_FLIP,
  SIGN_FLICKER,
  WINDOW_FLICKER,
} from './heroMotion.constants';
import { signFlickerKeyframes, windowFlickerChance } from './heroScene.utils';
import { scrambleText } from './roleFlip.utils';

// It ends fully lit, as the static sign is.
export function createSignFlicker(letters: HTMLElement[]): gsap.core.Tween {
  gsap.set(letters, { opacity: SIGN_FLICKER.steps[0][1] });
  return gsap.to(letters, {
    keyframes: signFlickerKeyframes(),
    duration: SIGN_FLICKER.duration,
    ease: 'none',
    stagger: { each: 0, from: 'random', amount: SIGN_FLICKER.maxDelay },
  });
}

// It pauses when the hero leaves the screen; GSAP's clock itself stops while the tab is hidden
// (it runs on requestAnimationFrame).
export function createWindowFlicker(
  hero: HTMLElement,
  windows: HTMLElement[],
): gsap.core.Tween {
  const chance: number = windowFlickerChance();
  const clock: gsap.core.Tween = gsap.to(
    {},
    {
      duration: WINDOW_FLICKER.tick,
      repeat: -1,
      onRepeat: (): void => {
        if (Math.random() >= chance) {
          return;
        }
        const window: HTMLElement | undefined =
          windows[Math.floor(Math.random() * windows.length)];
        if (window !== undefined) {
          // The window's CSS transition fades it; an empty value gives it back to its class.
          window.style.opacity = window.style.opacity === '0' ? '' : '0';
        }
      },
    },
  );
  ScrollTrigger.create({
    trigger: hero,
    start: 'top bottom',
    end: 'bottom top',
    onToggle: (self: ScrollTrigger): void => {
      if (self.isActive) {
        clock.play();
      } else {
        clock.pause();
      }
    },
  });
  return clock;
}

export function createRoleFlip(
  role: HTMLElement,
  titles: readonly string[],
): gsap.core.Timeline {
  const timeline: gsap.core.Timeline = gsap.timeline({
    delay: ROLE_FLIP.startDelay,
  });
  const finalRole: string = role.textContent;
  let shown: string = finalRole;
  for (const title of [...titles, finalRole]) {
    const from: string = shown;
    timeline.add(
      progressTween(ROLE_FLIP.flipDuration, (progress: number): void => {
        role.textContent = scrambleText(from, title, progress, Math.random);
      }),
    );
    if (title !== finalRole) {
      timeline.to({}, { duration: ROLE_FLIP.hold });
    }
    shown = title;
  }
  return timeline;
}

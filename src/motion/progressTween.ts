import { gsap } from './gsap';

// A tween of time only. Motion drawn by a pure function of progress (the runner's moves) uses
// it, so the maths stay testable and GSAP only gives them time, pausing and reverting.
export function progressTween(
  duration: number,
  onProgress: (progress: number) => void,
): gsap.core.Tween {
  const clock: { progress: number } = { progress: 0 };
  return gsap.to(clock, {
    progress: 1,
    duration,
    ease: 'none',
    onUpdate: (): void => {
      onProgress(clock.progress);
    },
  });
}

import { gsap } from './gsap';

// A tween of time only: GSAP moves `progress` from 0 to 1 over `duration` seconds (linearly)
// and calls `onProgress` every frame. Motion that is drawn by a pure function of progress (the
// runner's moves) uses it, so the maths stay in testable functions and GSAP only gives them
// time, pausing and reverting.
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

// Lenis's own styles, loaded with this chunk. autoToggle below depends on them: they give
// <html> a 1 ms transition on overflow, and Lenis listens for its end.
import 'lenis/dist/lenis.css';

import Lenis from 'lenis';

import { gsap, ScrollTrigger } from './gsap';
import {
  LAG_ADJUSTED_DELTA,
  LAG_THRESHOLD,
  MS_PER_SECOND,
} from './lenis.constants';

// Starts smooth scrolling and returns the function that stops it (DECISIONS.md #004). Only the
// root motion component calls it, and only when reduced motion is off.
//
// Lenis and ScrollTrigger must agree on the scroll position in every frame, so:
// - GSAP's ticker drives Lenis (one animation loop instead of two), and
// - every Lenis scroll updates ScrollTrigger at once.
export function startSmoothScroll(): () => void {
  const lenis: Lenis = new Lenis({
    // A click on a link to a section scrolls there smoothly. The browser still changes the URL
    // and moves the focus start point, and Lenis stops below the fixed header because it reads
    // the page's scroll-padding-top.
    anchors: true,
    // Lenis stops while <html> has overflow: hidden (useScrollLock: the mobile menu, a dialog)
    // and starts again when the lock ends.
    autoToggle: true,
    // Scrollable boxes inside the page, such as a long dialog, keep their native scroll.
    allowNestedScroll: true,
  });

  function updateScrollTrigger(): void {
    ScrollTrigger.update();
  }
  lenis.on('scroll', updateScrollTrigger);

  function tick(time: number): void {
    lenis.raf(time * MS_PER_SECOND);
  }
  gsap.ticker.add(tick);
  // Lag smoothing would make Lenis jump after a slow frame, so it is off while Lenis runs.
  gsap.ticker.lagSmoothing(0);

  return (): void => {
    gsap.ticker.remove(tick);
    gsap.ticker.lagSmoothing(LAG_THRESHOLD, LAG_ADJUSTED_DELTA);
    lenis.destroy();
  };
}

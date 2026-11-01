import { HIT } from './heroMotion.constants';
import type { RigSpot } from './heroMotion.types';
import { rigScale } from './letterHop.utils';

// Layout reads and writes for the runner's overlay: they touch the DOM, so they live here and
// HeroRunner stays about state and moves.

// Sizes the overlay's viewBox to the hero in pixels, and returns the hero's box.
export function fitOverlay(hero: HTMLElement, overlay: SVGSVGElement): DOMRect {
  const box: DOMRect = hero.getBoundingClientRect();
  overlay.setAttribute(
    'viewBox',
    `0 0 ${String(box.width)} ${String(box.height)}`,
  );
  return box;
}

// Puts the click target around him: a circle above his feet at (x, y).
export function placeHit(
  hit: SVGCircleElement,
  x: number,
  y: number,
  scale: number,
): void {
  hit.setAttribute('cx', x.toFixed(1));
  hit.setAttribute('cy', (y - HIT.rise * scale).toFixed(1));
  hit.setAttribute('r', (HIT.radius * scale).toFixed(1));
}

// Where the static runner stands, from his box (feet at its bottom edge, hip in its middle),
// and his size from the sign's font size. Cheap: no glyph scan.
export function staticRunnerSpot(
  heroBox: DOMRect,
  staticRunner: Element,
  firstLetter: HTMLElement | undefined,
  fallbackScale: number,
): RigSpot {
  const runner: DOMRect = staticRunner.getBoundingClientRect();
  return {
    x: runner.left + runner.width * HIT.middle - heroBox.left,
    y: runner.bottom - heroBox.top,
    scale:
      firstLetter === undefined
        ? fallbackScale
        : rigScale(parseFloat(getComputedStyle(firstLetter).fontSize)),
    facing: 1,
  };
}

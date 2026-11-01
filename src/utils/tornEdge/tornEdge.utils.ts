import { createRandom } from '@/utils/random';

import {
  BOTTOM_DEPTH_PX,
  BOTTOM_STEP_PERCENT,
  FULL_WIDTH_PERCENT,
  TOP_DEPTH_PX,
  TOP_STEP_PERCENT,
} from './tornEdge.constants';

// A clip-path that makes a rectangle look like paper torn off a roll: a slightly uneven top
// edge and a ragged bottom one. Seeded, so the build and the browser cut the same edge.
export function tornEdge(seed: number): string {
  const random: () => number = createRandom(seed);
  const points: string[] = [];
  for (let x: number = 0; x <= FULL_WIDTH_PERCENT; x += TOP_STEP_PERCENT) {
    points.push(`${String(x)}% ${(random() * TOP_DEPTH_PX).toFixed(1)}px`);
  }
  for (let x: number = FULL_WIDTH_PERCENT; x >= 0; x -= BOTTOM_STEP_PERCENT) {
    points.push(
      `${String(x)}% calc(100% - ${(random() * BOTTOM_DEPTH_PX).toFixed(1)}px)`,
    );
  }
  return `polygon(${points.join(', ')})`;
}

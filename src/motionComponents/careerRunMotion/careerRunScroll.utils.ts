import type { CareerRunLayout } from '@/components';

import { HALF } from './careerRun.constants';

// The scroll position half-way through a stage, where the runner is on its roof (a stage
// starts in the middle of the jump onto it). `start` and `end` are the run's scroll range.
export function stageScroll(
  start: number,
  end: number,
  layout: CareerRunLayout,
  stage: number,
): number {
  const from: number = layout.stageStarts[stage] ?? 0;
  const to: number = layout.stageStarts[stage + 1] ?? 1;
  return start + (end - start) * (from + (to - from) * HALF);
}

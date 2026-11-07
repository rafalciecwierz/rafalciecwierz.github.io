import type { CareerRunLayout } from '@/components';

import { HALF } from './careerRun.constants';

// Half-way through a stage, where the runner is on its roof (a stage starts mid-jump).
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

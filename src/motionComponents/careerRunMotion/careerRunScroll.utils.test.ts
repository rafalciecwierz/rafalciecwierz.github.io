import { describe, expect, it } from 'vitest';

import { type CareerRunLayout, careerRunLayout } from '@/components';

import { stageScroll } from './careerRunScroll.utils';

const LAYOUT: CareerRunLayout = careerRunLayout([2, 2, 1, 1]);

describe('stageScroll', (): void => {
  it('finds the scroll half-way through a stage, the last one ending with the run', (): void => {
    const second: number = LAYOUT.stageStarts[2] ?? 0;
    const third: number = LAYOUT.stageStarts[3] ?? 0;
    const last: number = LAYOUT.stageStarts.at(-1) ?? 0;

    expect(stageScroll(1000, 5000, LAYOUT, 2)).toBeCloseTo(
      1000 + 4000 * ((second + third) / 2),
    );
    expect(stageScroll(1000, 5000, LAYOUT, 6)).toBeCloseTo(
      1000 + 4000 * ((last + 1) / 2),
    );
  });

  it('keeps every stage inside its own range, so the run shows that stage', (): void => {
    LAYOUT.stageStarts.forEach((start: number, stage: number): void => {
      const progress: number = stageScroll(0, 1, LAYOUT, stage);
      expect(progress).toBeGreaterThan(start);
      expect(progress).toBeLessThan(LAYOUT.stageStarts[stage + 1] ?? 1.01);
    });
  });
});

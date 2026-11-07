import { describe, expect, it } from 'vitest';

import { type CareerRunLayout, careerRunLayout, POSES } from '@/components';

import { cardStage, firstStages, runnerAt, stageCard } from './careerRun.utils';
import {
  cameraFor,
  layerTransform,
  rigCameraTransform,
} from './careerRunCamera.utils';
import type { RunFrame, RunView } from './careerRunMotion.types';

const ROLE_COUNTS: readonly number[] = [2, 2, 1, 1];
const LAYOUT: CareerRunLayout = careerRunLayout(ROLE_COUNTS);

describe('runnerAt', (): void => {
  it('starts running on the first roof, on its first stage', (): void => {
    const start: RunFrame = runnerAt(LAYOUT, 0);

    expect(start).toMatchObject({ x: 40, height: 170, ground: 170, stage: 0 });
  });

  it('ends crouched on the last roof, on the next roof stage', (): void => {
    const end: RunFrame = runnerAt(LAYOUT, 1);

    expect(end).toMatchObject({ x: 2050, height: 595, stage: 6 });
    expect(end.pose).toEqual(POSES.crouch);
  });

  it('flies above both roofs in the middle of a jump, and changes the card half-way', (): void => {
    const jump: CareerRunLayout['line'][number] | undefined = LAYOUT.line[1];
    const before: number = LAYOUT.line[0]?.length ?? 0;
    const length: number = jump?.length ?? 0;
    function atShare(share: number): RunFrame {
      return runnerAt(LAYOUT, (before + length * share) / LAYOUT.length);
    }

    expect(atShare(0.5).height).toBeGreaterThan(255);
    expect(atShare(0.4).stage).toBe(0);
    expect(atShare(0.6).stage).toBe(1);
  });

  it('only moves forward, and every stage comes in order', (): void => {
    const frames: RunFrame[] = [];
    for (let step: number = 0; step <= 100; step += 1) {
      frames.push(runnerAt(LAYOUT, step / 100));
    }

    frames.slice(1).forEach((frame: RunFrame, index: number): void => {
      const previous: RunFrame | undefined = frames[index];
      expect(frame.x).toBeGreaterThanOrEqual(previous?.x ?? 0);
      expect(frame.stage).toBeGreaterThanOrEqual(previous?.stage ?? 0);
    });
  });

  it('shows each stage from where the layout says it starts', (): void => {
    LAYOUT.stageStarts.forEach((start: number, stage: number): void => {
      expect(runnerAt(LAYOUT, Math.min(1, start + 0.001)).stage).toBe(stage);
    });
  });
});

describe('stageCard', (): void => {
  it('finds the card of each stage: newest first, the next roof first of all', (): void => {
    expect(stageCard(ROLE_COUNTS, 0)).toEqual({ card: 4, role: 0 });
    expect(stageCard(ROLE_COUNTS, 1)).toEqual({ card: 4, role: 1 });
    expect(stageCard(ROLE_COUNTS, 2)).toEqual({ card: 3, role: 0 });
    expect(stageCard(ROLE_COUNTS, 5)).toEqual({ card: 1, role: 0 });
    expect(stageCard(ROLE_COUNTS, 6)).toEqual({ card: 0, role: 0 });
  });
});

describe('cardStage', (): void => {
  it('finds the first stage of each card, the inverse of stageCard', (): void => {
    [0, 1, 2, 3, 4].forEach((card: number): void => {
      expect(stageCard(ROLE_COUNTS, cardStage(ROLE_COUNTS, card))).toEqual({
        card,
        role: 0,
      });
    });
  });
});

describe('firstStages', (): void => {
  it('lists the first stage of each job and the next roof, as the progress bar ticks', (): void => {
    expect(firstStages(ROLE_COUNTS)).toEqual([0, 2, 4, 5, 6]);
  });
});

describe('cameraFor', (): void => {
  it('draws the world at full size for a 980 px high window, smaller on narrow ones', (): void => {
    expect(cameraFor(1920, 980)).toEqual({
      scale: 1,
      anchorX: 576,
      anchorY: 686,
    });
    expect(cameraFor(1000, 980).scale).toBeCloseTo(0.85);
  });

  it('keeps the scale between 0.55 and 1.1', (): void => {
    expect(cameraFor(1920, 200).scale).toBe(0.55);
    expect(cameraFor(1920, 3000).scale).toBe(1.1);
  });
});

describe('layerTransform', (): void => {
  it('puts the focus point on the anchor', (): void => {
    const view: RunView = { scale: 2, anchorX: 500, anchorY: 300 };

    expect(
      layerTransform({ x: 100, y: -50 }, { minX: -100, minY: -100 }, view),
    ).toBe('translate3d(100.0px, 200.0px, 0) scale(2.0000)');
  });
});

describe('rigCameraTransform', (): void => {
  it('keeps his feet on the anchor while the camera follows his roof', (): void => {
    const view: RunView = { scale: 2, anchorX: 500, anchorY: 300 };
    const frame: RunFrame = runnerAt(LAYOUT, 0);

    expect(rigCameraTransform(frame, view)).toBe(
      'translate(420.0 640.0) scale(2.0000)',
    );
  });
});

import {
  type CareerRunLayout,
  mixPose,
  POSES,
  type RunSegment,
  STAGE_SWITCH,
} from '@/components';
import { clamp, easeInOutQuad, lerp } from '@/utils';

import {
  HOLD_CROUCH_SPEED,
  JUMP,
  LANDING_BLEND,
  SINE_TO_BLEND,
  STRIDE_LENGTH,
} from './careerRun.constants';
import type { RunFrame, StageCard } from './careerRunMotion.types';

// The career run as pure functions: where the runner is at each point of the scroll, which
// card goes with it, and where the camera puts the world.

function jumpPose(share: number): RunFrame['pose'] {
  if (share < JUMP.reachEnd) {
    return mixPose(POSES.runA, POSES.reach, share / JUMP.reachEnd);
  }
  if (share < JUMP.tuckEnd) {
    const tucking: number =
      (share - JUMP.reachEnd) / (JUMP.tuckEnd - JUMP.reachEnd);
    return mixPose(POSES.reach, POSES.tuck, easeInOutQuad(tucking));
  }
  return mixPose(
    POSES.tuck,
    POSES.land,
    (share - JUMP.tuckEnd) / (1 - JUMP.tuckEnd),
  );
}

// One piece of the line at `distance` units into it (of `segment.length`).
function frameOn(
  segment: RunSegment,
  distance: number,
  isFirst: boolean,
): RunFrame {
  const share: number = clamp(distance / segment.length, 0, 1);
  switch (segment.kind) {
    case 'run': {
      const x: number = lerp(segment.fromX, segment.toX, share);
      const stride: number = (Math.sin(x / STRIDE_LENGTH) + 1) * SINE_TO_BLEND;
      const running: RunFrame['pose'] = mixPose(POSES.runA, POSES.runB, stride);
      const pose: RunFrame['pose'] =
        !isFirst && distance < LANDING_BLEND
          ? mixPose(POSES.land, running, distance / LANDING_BLEND)
          : running;
      const { height, stage } = segment;
      return { x, height, ground: height, pose, stage };
    }
    case 'jump': {
      const { fromX, toX, fromHeight, toHeight, stage } = segment;
      // Higher and longer jumps get a higher arc.
      const arc: number =
        JUMP.baseArc +
        Math.max(0, toHeight - fromHeight) * JUMP.climbArc +
        (toX - fromX) * JUMP.distanceArc;
      return {
        x: lerp(fromX, toX, share),
        height:
          lerp(fromHeight, toHeight, share) +
          JUMP.arcFactor * arc * share * (1 - share),
        // The camera rises smoothly with him instead of following the arc.
        ground: lerp(fromHeight, toHeight, easeInOutQuad(share)),
        pose: jumpPose(share),
        stage: share < STAGE_SWITCH ? stage - 1 : stage,
      };
    }
    case 'hold': {
      const { x, height, stage } = segment;
      const pose: RunFrame['pose'] = mixPose(
        POSES.land,
        POSES.crouch,
        Math.min(1, share * HOLD_CROUCH_SPEED),
      );
      return { x, height, ground: height, pose, stage };
    }
  }
}

// Where he is at this point of the run (0 to 1).
export function runnerAt(layout: CareerRunLayout, progress: number): RunFrame {
  let distance: number = clamp(progress, 0, 1) * layout.length;
  const last: number = layout.line.length - 1;
  for (const [index, segment] of layout.line.entries()) {
    if (distance <= segment.length || index === last) {
      return frameOn(segment, distance, index === 0);
    }
    distance -= segment.length;
  }
  return { x: 0, height: 0, ground: 0, pose: POSES.stand, stage: 0 };
}

// The card for a stage. The cards are newest first with the next roof at 0, so the oldest
// job (stages 0 and 1 of the real career) is the last card.
export function stageCard(
  roleCounts: readonly number[],
  stage: number,
): StageCard {
  let first: number = 0;
  for (const [job, roles] of roleCounts.entries()) {
    if (stage < first + roles) {
      return { card: roleCounts.length - job, role: stage - first };
    }
    first += roles;
  }
  return { card: 0, role: 0 };
}

// The first stage of each job, oldest first, and the next roof's: one per progress bar tick.
export function firstStages(roleCounts: readonly number[]): number[] {
  const stages: number[] = [];
  let first: number = 0;
  for (const roles of roleCounts) {
    stages.push(first);
    first += roles;
  }
  stages.push(first);
  return stages;
}

// The first stage of a card: the inverse of stageCard. The next roof (card 0) is the stage
// after the last role.
export function cardStage(roleCounts: readonly number[], card: number): number {
  const stages: number[] = firstStages(roleCounts);
  const job: number = card === 0 ? roleCounts.length : roleCounts.length - card;
  return stages[job] ?? 0;
}

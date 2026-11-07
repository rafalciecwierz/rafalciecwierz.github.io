import { mixPose, POSES, type RigState } from '@/components';
import { clamp, easeInOutQuad } from '@/utils';

import { GLYPH_SCAN, JUMP, RIG_SCALE } from './heroMotion.constants';
import type { GlyphTop, Platform, PoseAt, RigSpot } from './heroMotion.types';

// In each column the first ink from the top is its top; x is the middle of the columns that
// reach the highest one, so he lands on the middle of the Ł's stem or of the Ć's acute.
export function glyphTop(
  pixels: Uint8ClampedArray,
  width: number,
  height: number,
  baseline: number,
): GlyphTop {
  let best: number = height;
  let columns: number[] = [];
  for (let x: number = 0; x < width; x += 1) {
    for (let y: number = 0; y < height; y += 1) {
      const alpha: number =
        pixels[
          (y * width + x) * GLYPH_SCAN.rgbaChannels + GLYPH_SCAN.alphaChannel
        ] ?? 0;
      if (alpha > GLYPH_SCAN.inkAlpha) {
        if (y < best - GLYPH_SCAN.edgeTolerance) {
          best = y;
          columns = [x];
        } else if (y <= best + GLYPH_SCAN.edgeTolerance) {
          columns.push(x);
        }
        break;
      }
    }
  }
  const first: number = columns[0] ?? width * GLYPH_SCAN.half;
  const last: number = columns[columns.length - 1] ?? first;
  return { x: (first + last) * GLYPH_SCAN.half, top: best - baseline };
}

export function rigScale(fontPx: number): number {
  return clamp(fontPx * RIG_SCALE.perFontPx, RIG_SCALE.min, RIG_SCALE.max);
}

export function jumpArc(distance: number, scale: number): number {
  return (JUMP.arcBase + distance * JUMP.arcPerPx) * (scale / JUMP.arcScale);
}

export function jumpDuration(distance: number): number {
  return clamp(
    JUMP.minDuration + distance * JUMP.durationPerPx,
    JUMP.minDuration,
    JUMP.maxDuration,
  );
}

export function jumpPose(progress: number): RigState['pose'] {
  if (progress < JUMP.reachEnd) {
    return mixPose(POSES.crouch, POSES.reach, progress / JUMP.reachEnd);
  }
  if (progress < JUMP.tuckEnd) {
    const tucking: number =
      (progress - JUMP.reachEnd) / (JUMP.tuckEnd - JUMP.reachEnd);
    return mixPose(POSES.reach, POSES.tuck, easeInOutQuad(tucking));
  }
  return mixPose(
    POSES.tuck,
    POSES.land,
    (progress - JUMP.tuckEnd) / (1 - JUMP.tuckEnd),
  );
}

export function stateAt(spot: RigSpot, pose: RigState['pose']): RigState {
  return {
    x: spot.x,
    y: spot.y,
    scale: spot.scale,
    facing: spot.facing,
    pose,
    spin: 0,
    isGrounded: false,
  };
}

export function jumpState(
  from: RigSpot,
  to: Platform,
  arc: number,
  poseAt: PoseAt,
  progress: number,
): RigState {
  const rise: number = JUMP.arcFactor * arc * progress * (1 - progress);
  return {
    ...stateAt(from, poseAt(progress)),
    x: from.x + (to.x - from.x) * progress,
    y: from.y + (to.y - from.y) * progress - rise,
  };
}

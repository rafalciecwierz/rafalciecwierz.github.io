import { mixPose, POSES, type RigState } from '@/components';
import { clamp, easeInOutQuad } from '@/utils';

import { GLYPH_SCAN, JUMP, RIG_SCALE } from './heroMotion.constants';
import type { GlyphTop, Platform, PoseAt, RigSpot } from './heroMotion.types';

// LetterHop as pure functions: where the top of a glyph is, and where the runner is at each
// moment of a jump or a trick.

// The top edge of a glyph drawn on a canvas, from its pixels (RGBA, row by row). It walks the
// columns from the left; in each, the first ink from the top is that column's top. The highest
// of those is the glyph's top, and x is the middle of the columns that reach it (within a
// pixel), so he lands on the middle of the Ł's stem or of the Ć's acute.
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

// His size on a sign of this font size.
export function rigScale(fontPx: number): number {
  return clamp(fontPx * RIG_SCALE.perFontPx, RIG_SCALE.min, RIG_SCALE.max);
}

// How high a jump of this distance arcs, and how long it takes (seconds).
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

// The pose through a plain jump: crouch to reach, reach to tuck, tuck to land.
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

// Him standing (or crouched) at a spot, in a pose.
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

// A moment of a jump from one spot to a platform: a straight line with a parabola on top.
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

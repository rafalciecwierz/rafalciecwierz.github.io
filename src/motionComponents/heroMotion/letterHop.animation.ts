import { mixPose, POSES, type RunnerRigHandle } from '@/components';
import { gsap } from '@/motion/gsap';
import { progressTween } from '@/motion/progressTween';

import { GLYPH_SCAN, JUMP } from './heroMotion.constants';
import type {
  GlyphTop,
  JumpOptions,
  Platform,
  PoseAt,
  RigSpot,
} from './heroMotion.types';
import {
  glyphTop,
  jumpArc,
  jumpDuration,
  jumpPose,
  jumpState,
  stateAt,
} from './letterHop.utils';

// Draws one letter on an offscreen canvas in the sign's font and finds the top of its glyph
// (glyphTop). The canvas also gives the font's ascent and descent, for placing the baseline.
function scanGlyph(
  character: string,
  font: string,
  fontPx: number,
): GlyphTop & { ascent: number; descent: number } {
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  canvas.width = Math.ceil(fontPx * GLYPH_SCAN.widthShare);
  canvas.height = Math.ceil(fontPx * GLYPH_SCAN.heightShare);
  const context: CanvasRenderingContext2D | null = canvas.getContext('2d', {
    willReadFrequently: true,
  });
  if (context === null) {
    return { x: 0, top: -fontPx, ascent: fontPx, descent: 0 };
  }
  const baseline: number = Math.round(fontPx * GLYPH_SCAN.baselineShare);
  context.font = font;
  context.textBaseline = 'alphabetic';
  context.fillText(character, 0, baseline);
  const metrics: TextMetrics = context.measureText(character);
  const pixels: Uint8ClampedArray = context.getImageData(
    0,
    0,
    canvas.width,
    canvas.height,
  ).data;
  return {
    ...glyphTop(pixels, canvas.width, canvas.height, baseline),
    ascent: metrics.fontBoundingBoxAscent,
    descent: metrics.fontBoundingBoxDescent,
  };
}

// Where his feet go on each letter of the sign, in the hero's pixels, and the sign's font size.
// A letter's baseline sits in its line box the way CSS places it: half of the spare line height
// above the font's ascent, below the letter's top padding.
export function measurePlatforms(
  hero: HTMLElement,
  letters: readonly HTMLElement[],
): { platforms: Platform[]; fontPx: number } {
  const first: HTMLElement | undefined = letters[0];
  if (first === undefined) {
    return { platforms: [], fontPx: 0 };
  }
  const style: CSSStyleDeclaration = getComputedStyle(first);
  const fontPx: number = parseFloat(style.fontSize);
  const lineHeight: number = parseFloat(style.lineHeight);
  const padding: number = parseFloat(style.paddingTop);
  const font: string = `${style.fontWeight} ${String(fontPx)}px ${style.fontFamily}`;
  const heroBox: DOMRect = hero.getBoundingClientRect();
  const platforms: Platform[] = letters.map((letter: HTMLElement): Platform => {
    const box: DOMRect = letter.getBoundingClientRect();
    const glyph: ReturnType<typeof scanGlyph> = scanGlyph(
      letter.textContent.toUpperCase(),
      font,
      fontPx,
    );
    const spare: number =
      (lineHeight - (glyph.ascent + glyph.descent)) * GLYPH_SCAN.half;
    const baseline: number = box.top + padding + spare + glyph.ascent;
    return {
      x: box.left - heroBox.left + glyph.x,
      y: baseline - heroBox.top + glyph.top,
    };
  });
  return { platforms, fontPx };
}

// One jump from where he is to a platform, then a settle into a crouch (unless it chains into
// the next move).
export function createJump(
  rig: RunnerRigHandle,
  from: RigSpot,
  to: Platform,
  options: JumpOptions = {},
): gsap.core.Timeline {
  const distance: number = Math.hypot(to.x - from.x, to.y - from.y);
  const arc: number = options.arc ?? jumpArc(distance, from.scale);
  const poseAt: PoseAt = options.poseAt ?? jumpPose;
  const landed: RigSpot = { ...from, x: to.x, y: to.y };
  return gsap
    .timeline()
    .add(
      progressTween(
        options.duration ?? jumpDuration(distance),
        (progress: number): void => {
          rig.set(jumpState(from, to, arc, poseAt, progress));
        },
      ),
    )
    .add(
      progressTween(JUMP.settle, (progress: number): void => {
        rig.set(stateAt(landed, mixPose(POSES.land, POSES.crouch, progress)));
      }),
    );
}

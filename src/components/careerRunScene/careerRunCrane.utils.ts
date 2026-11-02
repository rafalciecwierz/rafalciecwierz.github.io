import { CRANE, HALF } from './careerRunScene.constants';
import type { Crane, CraneBox, Facade } from './careerRunScene.types';

// The tower crane over the unbuilt next roof. A lattice mast, a jib over the gap, a
// counter-jib with its weight, and a beam on the hook make it read as a crane. A post with a
// beam and a rope would read as a gallows.

function point(x: number, y: number): string {
  return `${String(x)} ${String(y)}`;
}

function line(fromX: number, fromY: number, toX: number, toY: number): string {
  return `M${point(fromX, fromY)} L${point(toX, toY)}`;
}

// A zigzag between two horizontal chords, from left to right, a brace every bay.
function trussAcross(
  left: number,
  right: number,
  top: number,
  bottom: number,
): string {
  const points: string[] = [];
  for (
    let x: number = left, isTop: boolean = false;
    x <= right;
    x += CRANE.bay
  ) {
    points.push(point(x, isTop ? top : bottom));
    isTop = !isTop;
  }
  return `M${points.join(' L')}`;
}

// A zigzag between two vertical rails, from the street up to the jib.
function trussUp(left: number, right: number, top: number): string {
  const points: string[] = [];
  for (let y: number = 0, isLeft: boolean = true; y >= top; y -= CRANE.bay) {
    points.push(point(isLeft ? left : right, y));
    isLeft = !isLeft;
  }
  return `M${points.join(' L')}`;
}

// A box centred on x.
function centred(
  x: number,
  y: number,
  width: number,
  height: number,
): CraneBox {
  return { x: x - width * HALF, y, width, height };
}

export function craneOver(roof: Facade): Crane {
  const mast: number = roof.x + roof.width - CRANE.inset;
  const left: number = mast - CRANE.mastHalf;
  const right: number = mast + CRANE.mastHalf;
  const peak: number = -roof.height - CRANE.rise;
  const top: number = peak + CRANE.peak;
  const bottom: number = top + CRANE.depth;
  const tip: number = roof.x - CRANE.reach;
  const tail: number = mast + CRANE.counterReach;
  const hook: number = roof.x - CRANE.trolley.at;

  const trolley: CraneBox = centred(
    hook,
    bottom,
    CRANE.trolley.width,
    CRANE.trolley.height,
  );
  const ropeEnd: number = trolley.y + trolley.height + CRANE.rope;
  const block: CraneBox = centred(
    hook,
    ropeEnd,
    CRANE.block.width,
    CRANE.block.height,
  );
  const blockBottom: number = block.y + block.height;
  const load: CraneBox = centred(
    hook,
    blockBottom + CRANE.sling,
    CRANE.load.width,
    CRANE.load.height,
  );

  return {
    frame: [
      line(left, 0, left, bottom),
      line(right, 0, right, bottom),
      line(tip, bottom, tail, bottom),
      line(tip, top, tail, top),
      line(tip, top, tip, bottom),
      line(tail, top, tail, bottom),
      `M${point(left, top)} L${point(mast, peak)} L${point(right, top)}`,
    ].join(' '),
    lattice: [
      trussAcross(tip, tail, top, bottom),
      trussUp(left, right, bottom),
    ].join(' '),
    ties: [line(mast, peak, tip, top), line(mast, peak, tail, top)].join(' '),
    rope: [
      line(hook, trolley.y + trolley.height, hook, ropeEnd),
      line(hook, blockBottom, load.x, load.y),
      line(hook, blockBottom, load.x + load.width, load.y),
    ].join(' '),
    cab: {
      x: left - CRANE.cab.width,
      y: bottom,
      width: CRANE.cab.width,
      height: CRANE.cab.height,
    },
    weight: {
      x: tail - CRANE.weight.width,
      y: bottom,
      width: CRANE.weight.width,
      height: CRANE.weight.height,
    },
    trolley,
    block,
    load,
  };
}

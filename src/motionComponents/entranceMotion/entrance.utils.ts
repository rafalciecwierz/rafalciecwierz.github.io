import {
  LINEAR_BETWEEN_KEYFRAMES,
  PASTE_UP,
  VAULT,
} from './entrance.constants';
import type { Keyframe, PercentKeyframes } from './entrance.types';

// Where a vaulting letter starts, in pixels for a title of this font size.
export function vaultStart(fontSize: number): Keyframe {
  return {
    x: VAULT.start.x * fontSize,
    y: VAULT.start.y * fontSize,
    rotation: VAULT.start.rotation,
    opacity: VAULT.start.opacity,
  };
}

// The keyframes of one letter's vault: start, the top of the arc, the squash, at rest. Only
// transform and opacity change, so the browser can animate them without layout.
export function vaultKeyframes(fontSize: number): PercentKeyframes {
  return {
    '0%': vaultStart(fontSize),
    '42%': {
      x: VAULT.apex.x * fontSize,
      y: VAULT.apex.y * fontSize,
      rotation: VAULT.apex.rotation,
      opacity: VAULT.apex.opacity,
    },
    '78%': {
      x: 0,
      y: VAULT.squash.y * fontSize,
      rotation: 0,
      scaleX: VAULT.squash.scaleX,
      scaleY: VAULT.squash.scaleY,
    },
    '100%': { x: 0, y: 0, rotation: 0, scaleX: 1, scaleY: 1, opacity: 1 },
    easeEach: LINEAR_BETWEEN_KEYFRAMES,
  };
}

// The keyframes of a poster being pasted. `rotation` is the poster's whole angle: when GSAP
// first animates an element's transform, it takes over the CSS `rotate` (the tilt) into its
// own transform, so the last keyframe sets the tilt back and the poster lands at its angle.
export function pasteUpKeyframes(tilt: number): PercentKeyframes {
  return {
    '0%': {
      opacity: 0,
      y: PASTE_UP.drop,
      rotation: tilt * PASTE_UP.startTurn,
      scale: PASTE_UP.startScale,
    },
    '70%': {
      opacity: 1,
      y: PASTE_UP.overshoot,
      rotation: tilt * PASTE_UP.swingTurn,
      scale: PASTE_UP.swingScale,
    },
    '100%': { opacity: 1, y: 0, rotation: tilt, scale: 1 },
    easeEach: LINEAR_BETWEEN_KEYFRAMES,
  };
}

// A poster's tilt from its data-tilt attribute, 0 when it has none.
export function tiltOf(value: string | undefined): number {
  const tilt: number = Number(value);
  return Number.isFinite(tilt) ? tilt : 0;
}

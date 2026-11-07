import type { Keyframe, PercentKeyframes } from '@/motion/keyframes.types';

import {
  LINEAR_BETWEEN_KEYFRAMES,
  PASTE_UP,
  VAULT,
} from './entrance.constants';

export function vaultStart(fontSize: number): Keyframe {
  return {
    x: VAULT.start.x * fontSize,
    y: VAULT.start.y * fontSize,
    rotation: VAULT.start.rotation,
    opacity: VAULT.start.opacity,
  };
}

// Only transform and opacity change, so the browser can animate them without layout.
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

// When GSAP first animates a transform, it takes the CSS `rotate` (the tilt) into its own
// transform, so the last keyframe sets the tilt back and the poster lands at its angle.
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

export function tiltOf(value: string | undefined): number {
  const tilt: number = Number(value);
  return Number.isFinite(tilt) ? tilt : 0;
}

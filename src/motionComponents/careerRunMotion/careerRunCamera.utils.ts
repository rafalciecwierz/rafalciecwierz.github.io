import { clamp } from '@/utils';

import { CAMERA, PIXEL_DECIMALS, SCALE_DECIMALS } from './careerRun.constants';
import type { LayerOrigin, RunFrame, RunView } from './careerRunMotion.types';

// The run's camera as pure functions: how big the world is drawn and where each layer goes.

// The camera for this window size.
export function cameraFor(width: number, height: number): RunView {
  const isNarrow: boolean = width < CAMERA.narrowWidth;
  return {
    scale:
      clamp(height / CAMERA.designHeight, CAMERA.minScale, CAMERA.maxScale) *
      (isNarrow ? CAMERA.narrowScale : 1),
    anchorX: width * (isNarrow ? CAMERA.anchorXNarrow : CAMERA.anchorX),
    anchorY: height * CAMERA.anchorY,
  };
}

// The CSS transform that puts a layer's `focus` point (in its own units) on the camera's
// anchor. The layer is drawn from its top left corner (`origin`) at 1 px per unit, so the
// browser only moves and scales a picture it has already painted.
export function layerTransform(
  focus: { x: number; y: number },
  origin: LayerOrigin,
  view: RunView,
): string {
  const x: number = view.anchorX - (focus.x - origin.minX) * view.scale;
  const y: number = view.anchorY - (focus.y - origin.minY) * view.scale;
  return `translate3d(${x.toFixed(PIXEL_DECIMALS)}px, ${y.toFixed(PIXEL_DECIMALS)}px, 0) scale(${view.scale.toFixed(SCALE_DECIMALS)})`;
}

// The SVG transform of the runner's own layer. It is drawn in world units with the street at
// 0 (no corner offset, unlike the city layers), so the same camera puts him on his roof.
export function rigCameraTransform(frame: RunFrame, view: RunView): string {
  const x: number = view.anchorX - frame.x * view.scale;
  const y: number = view.anchorY + frame.ground * view.scale;
  return `translate(${x.toFixed(PIXEL_DECIMALS)} ${y.toFixed(PIXEL_DECIMALS)}) scale(${view.scale.toFixed(SCALE_DECIMALS)})`;
}

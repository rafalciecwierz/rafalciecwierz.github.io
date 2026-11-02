import {
  type ComponentType,
  lazy,
  type ReactElement,
  Suspense,
  useState,
} from 'react';

import {
  useIsHydrated,
  useIsIdle,
  useMediaQuery,
  useReducedMotion,
} from '@/hooks';

import { ANY_MEDIA } from './motionLayer.constants';
import type {
  MotionComponentProps,
  MotionLayerProps,
} from './motionLayer.types';

// Adds motion on top of the static page (docs/ARCHITECTURE.md section 9, DECISIONS.md #005).
// It renders nothing on the server and during hydration. After hydration, when the browser is
// idle and reduced motion is off, it loads its motion component (a separate chunk) and mounts
// it. When the reader turns reduced motion on, or the window leaves the layer's `media`, the
// motion component unmounts, and useGSAP reverts everything it animated, so the static page
// is back.
export function MotionLayer({
  load,
  scope,
  media,
}: MotionLayerProps): ReactElement | null {
  const isHydrated: boolean = useIsHydrated();
  const isIdle: boolean = useIsIdle();
  const isReducedMotion: boolean = useReducedMotion();
  // Hooks cannot be called conditionally, so a layer without `media` asks for "all" and
  // ignores the answer.
  const isMediaMatch: boolean = useMediaQuery(media ?? ANY_MEDIA, false);
  const isAllowedHere: boolean = media === undefined || isMediaMatch;
  // lazy() is called once per layer, not on every render: a new lazy component on each render
  // would remount the motion component and start its chunk loading again.
  const [MotionComponent] = useState<ComponentType<MotionComponentProps>>(
    (): ComponentType<MotionComponentProps> => lazy(load),
  );

  if (!isHydrated || !isIdle || isReducedMotion || !isAllowedHere) {
    return null;
  }
  // The motion component is decorative, so nothing is shown while its chunk loads.
  return (
    <Suspense fallback={null}>
      <MotionComponent scope={scope} />
    </Suspense>
  );
}

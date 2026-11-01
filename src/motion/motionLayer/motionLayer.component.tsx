import {
  type ComponentType,
  lazy,
  type ReactElement,
  Suspense,
  useState,
} from 'react';

import { useIsHydrated, useIsIdle, useReducedMotion } from '@/hooks';

import type {
  MotionComponentProps,
  MotionLayerProps,
} from './motionLayer.types';

// Adds motion on top of the static page (docs/ARCHITECTURE.md section 9, DECISIONS.md #005).
// It renders nothing on the server and during hydration. After hydration, when the browser is
// idle and reduced motion is off, it loads its motion component (a separate chunk) and mounts
// it. When the reader turns reduced motion on, the motion component unmounts, and useGSAP
// reverts everything it animated, so the static page is back.
export function MotionLayer({
  load,
  scope,
}: MotionLayerProps): ReactElement | null {
  const isHydrated: boolean = useIsHydrated();
  const isIdle: boolean = useIsIdle();
  const isReducedMotion: boolean = useReducedMotion();
  // lazy() is called once per layer, not on every render: a new lazy component on each render
  // would remount the motion component and start its chunk loading again.
  const [MotionComponent] = useState<ComponentType<MotionComponentProps>>(
    (): ComponentType<MotionComponentProps> => lazy(load),
  );

  if (!isHydrated || !isIdle || isReducedMotion) {
    return null;
  }
  // The motion component is decorative, so nothing is shown while its chunk loads.
  return (
    <Suspense fallback={null}>
      <MotionComponent scope={scope} />
    </Suspense>
  );
}

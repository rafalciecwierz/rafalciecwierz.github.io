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

export function MotionLayer({
  load,
  scope,
  media,
}: MotionLayerProps): ReactElement | null {
  const isHydrated: boolean = useIsHydrated();
  const isIdle: boolean = useIsIdle();
  const isReducedMotion: boolean = useReducedMotion();
  const isMediaMatch: boolean = useMediaQuery(media ?? ANY_MEDIA, false);
  const isAllowedHere: boolean = media === undefined || isMediaMatch;
  const [MotionComponent] = useState<ComponentType<MotionComponentProps>>(
    (): ComponentType<MotionComponentProps> => lazy(load),
  );

  if (!isHydrated || !isIdle || isReducedMotion || !isAllowedHere) {
    return null;
  }
  return (
    <Suspense fallback={null}>
      <MotionComponent scope={scope} />
    </Suspense>
  );
}

import type { ComponentType, RefObject } from 'react';

// What every motion component receives: the element whose DOM it animates. The root motion
// component (smooth scroll) has no element, so the scope is optional.
export type MotionComponentProps = {
  scope?: RefObject<HTMLElement | null> | undefined;
};

// The shape React.lazy needs: a promise of a module with a `default` component.
export type MotionModule = {
  default: ComponentType<MotionComponentProps>;
};

// A function that loads one motion component with import(), so it gets its own chunk.
export type MotionLoader = () => Promise<MotionModule>;

export type MotionLayerProps = {
  load: MotionLoader;
  scope?: RefObject<HTMLElement | null>;
};

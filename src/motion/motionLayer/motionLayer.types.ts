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
  // A media query the motion needs (the career run: 900 px and wider). While it does not
  // match, the motion component is not loaded, or is unmounted, so its chunk is never
  // downloaded on screens that do not use it. Left out, the motion runs at every size.
  media?: string;
};

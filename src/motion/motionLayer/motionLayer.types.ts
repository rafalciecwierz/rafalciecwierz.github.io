import type { ComponentType, RefObject } from 'react';

export type MotionComponentProps = {
  scope?: RefObject<HTMLElement | null> | undefined;
};

export type MotionModule = {
  default: ComponentType<MotionComponentProps>;
};

export type MotionLoader = () => Promise<MotionModule>;

export type MotionLayerProps = {
  load: MotionLoader;
  scope?: RefObject<HTMLElement | null>;
  media?: string;
};

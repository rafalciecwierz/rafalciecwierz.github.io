import type { PAGE_PATHS } from './site.constants';

export type ShareImage = {
  path: string;
  width: number;
  height: number;
};

export type PagePath = (typeof PAGE_PATHS)[keyof typeof PAGE_PATHS];

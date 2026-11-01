import type { PAGE_PATHS } from './site.constants';

// The image link previews show (LinkedIn, Slack, X), served from public/.
export type ShareImage = {
  path: string;
  width: number;
  height: number;
};

export type PagePath = (typeof PAGE_PATHS)[keyof typeof PAGE_PATHS];

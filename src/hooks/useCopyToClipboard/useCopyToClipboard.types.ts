import type { CopyResult } from '@/services';

export type CopyToClipboard = {
  // The last result, or null when nothing was copied recently.
  result: CopyResult | null;
  copy: (text: string, fallbackElement: HTMLElement | null) => void;
};

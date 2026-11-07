import type { CopyResult } from '@/services';

export type CopyToClipboard = {
  result: CopyResult | null;
  copy: (text: string, fallbackElement: HTMLElement | null) => void;
};

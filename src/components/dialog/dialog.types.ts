import type { ReactNode } from 'react';

export type DialogProps = {
  isOpen: boolean;
  // Called when the dialog closes by itself (Escape) or through the close button.
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
};

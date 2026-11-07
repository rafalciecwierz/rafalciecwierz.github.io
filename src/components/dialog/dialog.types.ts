import type { ReactNode } from 'react';

export type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
};

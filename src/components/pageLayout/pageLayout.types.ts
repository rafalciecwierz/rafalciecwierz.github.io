import type { ReactNode } from 'react';

export type PageLayoutProps = {
  skipLinkLabel: string;
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
};

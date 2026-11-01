import type { ReactNode } from 'react';

export type PageLayoutProps = {
  skipLinkLabel: string;
  // The page's header and footer sections, passed in, because components never import
  // sections (docs/ARCHITECTURE.md section 3).
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
};

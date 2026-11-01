import type { ReactElement } from 'react';

import { SECTION_IDS } from '@/constants';
import { anchorHref } from '@/utils';

import styles from './pageLayout.module.scss';
import type { PageLayoutProps } from './pageLayout.types';

// The frame of every page: the skip link first, so it is the first Tab stop, then the
// landmarks a screen reader user jumps between: banner (header), main and contentinfo (footer).
export function PageLayout({
  skipLinkLabel,
  header,
  footer,
  children,
}: PageLayoutProps): ReactElement {
  return (
    <>
      <a className={styles.skipLink} href={anchorHref(SECTION_IDS.main)}>
        {skipLinkLabel}
      </a>
      {header}
      {/* tabIndex -1: the skip link moves focus here, so a screen reader announces the main
          content, without adding main to the Tab order. */}
      <main id={SECTION_IDS.main} tabIndex={-1} className={styles.main}>
        {children}
      </main>
      {footer}
    </>
  );
}

import type { ReactElement } from 'react';

import { SECTION_IDS } from '@/constants';
import { anchorHref } from '@/utils';

import styles from './pageLayout.module.scss';
import type { PageLayoutProps } from './pageLayout.types';

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
      <main id={SECTION_IDS.main} tabIndex={-1} className={styles.main}>
        {children}
      </main>
      {footer}
    </>
  );
}

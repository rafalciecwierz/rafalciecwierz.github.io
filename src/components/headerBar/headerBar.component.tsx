import { type ReactElement, type RefObject, useRef } from 'react';

import { useInView } from '@/hooks';
import { classNames } from '@/utils';

import styles from './headerBar.module.scss';
import type { HeaderBarProps } from './headerBar.types';

export function HeaderBar({ children }: HeaderBarProps): ReactElement {
  const sentinelRef: RefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);
  const isAtTop: boolean = useInView(sentinelRef, true);

  return (
    <>
      <div ref={sentinelRef} className={styles.sentinel} aria-hidden="true" />
      <header
        className={classNames(styles.headerBar, !isAtTop && styles.solid)}
      >
        {children}
      </header>
    </>
  );
}

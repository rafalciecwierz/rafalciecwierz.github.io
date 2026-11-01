import { type ReactElement, type RefObject, useRef } from 'react';

import { useInView } from '@/hooks';
import { classNames } from '@/utils';

import styles from './headerBar.module.scss';
import type { HeaderBarProps } from './headerBar.types';

// The fixed bar at the top of the page. It fades into the hero while the page is at the top,
// and turns solid once the page moves, so the links stay readable over any section.
//
// "Once the page moves" is a sentinel: an invisible strip at the very top of the document.
// While it is on screen the page is at the top. An IntersectionObserver reports it, so no
// scroll listener runs on every frame. The pre-rendered HTML is the "at the top" state.
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

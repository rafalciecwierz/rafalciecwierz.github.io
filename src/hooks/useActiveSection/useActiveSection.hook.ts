import { useEffect, useState } from 'react';

import { READING_BAND } from './useActiveSection.constants';
import { pickActiveSection } from './useActiveSection.utils';

// The id of the section in the middle of the screen, or null before the browser reports one
// (on the server and during hydration). The navigation marks its link with aria-current.
// `sectionIds` must be a stable array (from the content or useMemo), or the observer restarts.
export function useActiveSection(sectionIds: readonly string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect((): (() => void) | undefined => {
    if (!('IntersectionObserver' in window)) {
      return undefined;
    }
    // The sections in the band right now. The observer reports only changes, so the set is
    // kept between its calls; a section leaving the band is removed, so the mark clears too.
    const visibleIds: Set<string> = new Set<string>();
    const observer: IntersectionObserver = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]): void => {
        entries.forEach((entry: IntersectionObserverEntry): void => {
          if (entry.isIntersecting) {
            visibleIds.add(entry.target.id);
          } else {
            visibleIds.delete(entry.target.id);
          }
        });
        setActiveId(pickActiveSection(sectionIds, visibleIds));
      },
      { rootMargin: READING_BAND },
    );
    sectionIds.forEach((id: string): void => {
      const section: HTMLElement | null = document.getElementById(id);
      if (section !== null) {
        observer.observe(section);
      }
    });
    return (): void => {
      observer.disconnect();
    };
  }, [sectionIds]);

  return activeId;
}

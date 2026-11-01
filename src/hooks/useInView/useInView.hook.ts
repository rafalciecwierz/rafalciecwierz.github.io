import { type RefObject, useEffect, useState } from 'react';

// Whether the element is on screen. Until the browser reports (on the server, during hydration
// and where IntersectionObserver is missing) it returns `isInitiallyInView`, so the first render
// matches the pre-rendered HTML.
export function useInView(
  ref: RefObject<Element | null>,
  isInitiallyInView: boolean,
): boolean {
  const [isInView, setIsInView] = useState<boolean>(isInitiallyInView);

  useEffect((): (() => void) | undefined => {
    const element: Element | null = ref.current;
    if (element === null || !('IntersectionObserver' in window)) {
      return undefined;
    }
    const observer: IntersectionObserver = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]): void => {
        const entry: IntersectionObserverEntry | undefined = entries[0];
        if (entry !== undefined) {
          setIsInView(entry.isIntersecting);
        }
      },
    );
    observer.observe(element);
    return (): void => {
      observer.disconnect();
    };
  }, [ref]);

  return isInView;
}

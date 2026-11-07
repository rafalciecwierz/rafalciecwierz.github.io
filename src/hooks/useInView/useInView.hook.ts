import { type RefObject, useEffect, useState } from 'react';

// Until the browser reports, it returns `isInitiallyInView`, so hydration matches.
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

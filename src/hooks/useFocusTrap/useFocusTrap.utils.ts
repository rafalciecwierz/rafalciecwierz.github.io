import { FOCUSABLE_SELECTOR } from './useFocusTrap.constants';

export function focusableIn(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  );
}

// Only the two ends need help; anywhere else the browser's own Tab order is right (null).
export function wrapFocusTarget(
  elements: readonly HTMLElement[],
  current: Element | null,
  isBackward: boolean,
): HTMLElement | null {
  const first: HTMLElement | undefined = elements[0];
  const last: HTMLElement | undefined = elements.at(-1);
  if (first === undefined || last === undefined) {
    return null;
  }
  const isInside: boolean = elements.some(
    (element: HTMLElement): boolean => element === current,
  );
  if (!isInside) {
    return first;
  }
  if (isBackward) {
    return current === first ? last : null;
  }
  return current === last ? first : null;
}

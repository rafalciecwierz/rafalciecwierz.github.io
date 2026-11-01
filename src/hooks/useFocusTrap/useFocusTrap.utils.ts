import { FOCUSABLE_SELECTOR } from './useFocusTrap.constants';

// The elements inside the container that Tab can reach, in document order.
export function focusableIn(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  );
}

// Where Tab should go so focus never leaves the trap. Only the two ends need help: from the
// last element forward to the first, and from the first backward to the last. Anywhere else
// the browser's own Tab order is right, so the answer is null.
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

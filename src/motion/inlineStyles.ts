// Called in a motion component's cleanup, after GSAP's own revert: GSAP restores most of what
// it set, but not always the starting values that keyframe tweens recorded.
export function saveInlineStyles(elements: readonly Element[]): () => void {
  const saved: [Element, string | null][] = elements.map(
    (element: Element): [Element, string | null] => [
      element,
      element.getAttribute('style'),
    ],
  );
  return (): void => {
    for (const [element, style] of saved) {
      if (style === null) {
        element.removeAttribute('style');
      } else {
        element.setAttribute('style', style);
      }
    }
  };
}

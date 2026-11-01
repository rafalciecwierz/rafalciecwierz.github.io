// Saves the inline style attribute of elements and returns the function that puts it back.
// A motion component calls it in its cleanup, after GSAP's own revert, so the static page is
// back exactly: GSAP restores most of what it set, but not always the starting values that
// keyframe tweens recorded. React's own inline styles (a poster's tilt) are part of the saved
// attribute, so they come back too.
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

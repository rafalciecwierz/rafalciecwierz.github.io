// Tags that hold no content, so there is nothing to make inert.
const SKIPPED_TAGS: ReadonlySet<string> = new Set<string>([
  'SCRIPT',
  'STYLE',
  'TEMPLATE',
]);

export function elementsOutside(
  container: HTMLElement,
  root: HTMLElement,
): HTMLElement[] {
  const outside: HTMLElement[] = [];
  let current: HTMLElement = container;
  while (current !== root && current.parentElement !== null) {
    const parent: HTMLElement = current.parentElement;
    for (const sibling of Array.from(parent.children)) {
      if (
        sibling !== current &&
        sibling instanceof HTMLElement &&
        !SKIPPED_TAGS.has(sibling.tagName)
      ) {
        outside.push(sibling);
      }
    }
    current = parent;
  }
  return outside;
}

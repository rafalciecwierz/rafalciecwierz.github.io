import type { CopyResult } from './clipboard.types';

// Selects the element's text on the page, the fallback when the clipboard is not available.
function selectText(element: HTMLElement): void {
  const range: Range = document.createRange();
  range.selectNodeContents(element);
  const selection: Selection | null = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
}

// Copies the text to the clipboard. If the browser refuses, it selects `fallbackElement`
// instead, so the reader can copy it with the keyboard.
export async function copyText(
  text: string,
  fallbackElement: HTMLElement | null,
): Promise<CopyResult> {
  try {
    await navigator.clipboard.writeText(text);
    return 'copied';
  } catch {
    if (fallbackElement !== null) {
      selectText(fallbackElement);
    }
    return 'selected';
  }
}

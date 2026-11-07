import type { CopyResult } from './clipboard.types';

function selectText(element: HTMLElement): void {
  const range: Range = document.createRange();
  range.selectNodeContents(element);
  const selection: Selection | null = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
}

// If the browser refuses, it selects `fallbackElement` so the reader can copy it by hand.
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

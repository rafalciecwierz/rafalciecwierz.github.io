// jsdom has no ResizeObserver, which Lenis uses to notice when the page changes size. Nothing
// is ever resized in a test, so this stand-in never reports.
class MockResizeObserver {
  observe(): void {
    // Nothing is resized in jsdom.
  }

  unobserve(): void {
    // Nothing to stop.
  }

  disconnect(): void {
    // Nothing to stop.
  }
}

export function installResizeObserver(): void {
  // Tests in scripts/ run in Node, which has no window.
  if (!('window' in globalThis)) {
    return;
  }
  window.ResizeObserver = MockResizeObserver;
}

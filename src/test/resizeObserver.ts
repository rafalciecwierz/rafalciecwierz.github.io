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
  if (!('window' in globalThis)) {
    return;
  }
  window.ResizeObserver = MockResizeObserver;
}

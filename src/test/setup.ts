// Adds DOM matchers such as toBeInTheDocument() to Vitest's expect.
import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach } from 'vitest';

import { installDialog } from './dialog';
import { installMatchMedia, resetMatchMedia } from './matchMedia';
import { installResizeObserver } from './resizeObserver';

// jsdom has no matchMedia (every media query starts as not matching), no showModal() and no
// ResizeObserver (used by Lenis).
beforeEach((): void => {
  installMatchMedia();
  installDialog();
  installResizeObserver();
});

// Testing Library cleans up by itself only when test globals are on; this project imports them explicitly.
afterEach((): void => {
  cleanup();
  resetMatchMedia();
});

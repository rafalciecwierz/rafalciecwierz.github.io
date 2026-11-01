// Adds DOM matchers such as toBeInTheDocument() to Vitest's expect.
import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach } from 'vitest';

import { installMatchMedia, resetMatchMedia } from './matchMedia';

// jsdom has no matchMedia; every media query starts as not matching (src/test/matchMedia.ts).
beforeEach((): void => {
  installMatchMedia();
});

// Testing Library cleans up by itself only when test globals are on; this project imports them explicitly.
afterEach((): void => {
  cleanup();
  resetMatchMedia();
});

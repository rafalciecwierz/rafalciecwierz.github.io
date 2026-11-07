import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach } from 'vitest';

import { installDialog } from './dialog';
import { installMatchMedia, resetMatchMedia } from './matchMedia';
import { installResizeObserver } from './resizeObserver';

beforeEach((): void => {
  installMatchMedia();
  installDialog();
  installResizeObserver();
});

afterEach((): void => {
  cleanup();
  resetMatchMedia();
});

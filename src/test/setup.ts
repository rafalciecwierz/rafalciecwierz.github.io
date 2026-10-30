// Adds DOM matchers such as toBeInTheDocument() to Vitest's expect.
import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Testing Library cleans up by itself only when test globals are on; this project imports them explicitly.
afterEach((): void => {
  cleanup();
});

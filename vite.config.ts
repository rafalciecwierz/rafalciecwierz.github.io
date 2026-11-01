import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

const SOURCE_DIRECTORY: string = fileURLToPath(
  new URL('./src', import.meta.url),
);

// One config for the dev server, both builds (browser and pre-render) and the tests.
export default defineConfig({
  plugins: [react()],
  // The year the site was built, for the footer. One value for the pre-render and the browser,
  // so hydration always matches, even on New Year's Day (docs/ARCHITECTURE.md section 10).
  define: { APP_BUILD_YEAR: JSON.stringify(new Date().getFullYear()) },
  // The site is served from the root of rafalciecwierz.github.io (brief section 2).
  base: '/',
  resolve: {
    alias: { '@': SOURCE_DIRECTORY },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}', 'scripts/**/*.test.ts'],
  },
});

// The global styles: tokens, fonts and the page-wide base (src/styles/global.scss).
import '@/styles/global.scss';

import { createRoot, hydrateRoot } from 'react-dom/client';

import { App } from './app.component';
import { NOT_FOUND_ROUTE, ROOT_ELEMENT_ID, ROUTES } from './app.constants';
import type { AppRoute } from './app.types';
import { hasPrerenderedContent, routeForLocation } from './app.utils';

const rootElement: HTMLElement | null =
  document.getElementById(ROOT_ELEMENT_ID);
if (rootElement === null) {
  throw new Error(
    `index.html has no element with the id "${ROOT_ELEMENT_ID}".`,
  );
}

const route: AppRoute = routeForLocation(
  ROUTES,
  NOT_FOUND_ROUTE,
  window.location.pathname,
);

// A built page already holds the HTML, so React only attaches to it (hydration).
// The dev server sends the empty template, so React renders the page itself.
if (hasPrerenderedContent(rootElement)) {
  hydrateRoot(rootElement, <App route={route} />);
} else {
  createRoot(rootElement).render(<App route={route} />);
}

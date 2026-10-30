import type { ComponentType } from 'react';

export type AppRoute = {
  path: string;
  page: ComponentType;
};

export type AppProps = {
  route: AppRoute;
};

// What the server entry returns for one route: the tags for <head> and the page's HTML.
export type RenderResult = {
  head: string;
  html: string;
};

// The interface of the built server entry (dist-server/entryServer.js), as scripts/prerender.ts uses it.
export type ServerEntry = {
  ROUTE_PATHS: readonly string[];
  render: (path: string) => RenderResult;
};

import { type ComponentType, type ReactElement, StrictMode } from 'react';

import type { AppProps } from './app.types';

export function App({ route }: AppProps): ReactElement {
  const Page: ComponentType = route.page;

  return (
    <StrictMode>
      <Page />
    </StrictMode>
  );
}

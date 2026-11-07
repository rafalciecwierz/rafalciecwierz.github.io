import { type ComponentType, type ReactElement, StrictMode } from 'react';

import { MotionLayer, type MotionModule } from '@/motion/motionLayer';

import type { AppProps } from './app.types';

async function loadRootMotion(): Promise<MotionModule> {
  const { RootMotion } =
    await import('@/motionComponents/rootMotion/rootMotion.component');
  return { default: RootMotion };
}

export function App({ route }: AppProps): ReactElement {
  const Page: ComponentType = route.page;

  return (
    <StrictMode>
      <Page />
      <MotionLayer load={loadRootMotion} />
    </StrictMode>
  );
}

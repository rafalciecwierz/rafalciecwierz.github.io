import { useEffect } from 'react';

import { startSmoothScroll } from '@/motion/lenis';

export function RootMotion(): null {
  useEffect((): (() => void) => startSmoothScroll(), []);
  return null;
}

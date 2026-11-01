import { useEffect } from 'react';

import { startSmoothScroll } from '@/motion/lenis';

// The motion of the whole page, mounted once by the app's root MotionLayer. For now that is
// smooth scrolling with Lenis. Unmounting it (reduced motion turned on) stops Lenis, and the
// browser's own scrolling is back.
export function RootMotion(): null {
  useEffect((): (() => void) => startSmoothScroll(), []);
  return null;
}

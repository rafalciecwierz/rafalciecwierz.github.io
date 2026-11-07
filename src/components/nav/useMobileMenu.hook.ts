import { type RefObject, useCallback, useRef, useState } from 'react';

import {
  useEscapeKey,
  useFocusTrap,
  useInertOutside,
  useMediaQuery,
  useScrollLock,
} from '@/hooks';
import { mediaQueryBelow } from '@/utils';

import { MOBILE_MENU_BREAKPOINT } from './nav.constants';
import type { MobileMenu } from './nav.types';

// The menu counts as open only while the layout is the mobile one. If the window grows past
// the breakpoint with the menu open (a rotated tablet), the trap and the scroll lock end at
// once, derived during render instead of synced by an effect.
export function useMobileMenu(): MobileMenu {
  const [isOpenRequested, setIsOpenRequested] = useState<boolean>(false);
  const isMobileLayout: boolean = useMediaQuery(
    mediaQueryBelow(MOBILE_MENU_BREAKPOINT),
    false,
  );
  const isOpen: boolean = isOpenRequested && isMobileLayout;
  const panelRef: RefObject<HTMLElement | null> = useRef<HTMLElement>(null);
  const buttonRef: RefObject<HTMLButtonElement | null> =
    useRef<HTMLButtonElement>(null);

  const open: () => void = useCallback((): void => {
    setIsOpenRequested(true);
  }, []);
  const close: () => void = useCallback((): void => {
    setIsOpenRequested(false);
  }, []);

  // Before the focus trap: effects are cleaned up in this order, so the Menu button is no
  // longer inert when the trap sends focus back to it.
  useInertOutside(panelRef, isOpen);
  useFocusTrap({
    containerRef: panelRef,
    returnFocusRef: buttonRef,
    isActive: isOpen,
  });
  useEscapeKey(isOpen, close);
  useScrollLock(isOpen);

  return { isOpen, open, close, panelRef, buttonRef };
}

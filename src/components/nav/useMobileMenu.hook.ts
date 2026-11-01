import { type RefObject, useCallback, useRef, useState } from 'react';

import {
  useEscapeKey,
  useFocusTrap,
  useMediaQuery,
  useScrollLock,
} from '@/hooks';
import { mediaQueryBelow } from '@/utils';

import { MOBILE_MENU_BREAKPOINT } from './nav.constants';
import type { MobileMenu } from './nav.types';

// The state of the mobile menu and everything an open full-screen menu needs: focus moves in
// and is trapped, Escape closes it, the page under it does not scroll, and focus returns to
// the Menu button when it closes. The menu is closed on the server, so hydration matches.
//
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

  useFocusTrap({
    containerRef: panelRef,
    returnFocusRef: buttonRef,
    isActive: isOpen,
  });
  useEscapeKey(isOpen, close);
  useScrollLock(isOpen);

  return { isOpen, open, close, panelRef, buttonRef };
}

import { type ReactElement, type RefObject, useEffect, useRef } from 'react';

import { useScrollLock } from '@/hooks';

import styles from './dialog.module.scss';
import type { DialogProps } from './dialog.types';

// A modal panel on the native <dialog>. showModal() brings what a modal needs from the browser:
// focus moves in, the page behind is inert, Escape closes it, and focus returns to the button
// that opened it. A side panel on wide screens, a bottom sheet below 760px.
export function Dialog({
  isOpen,
  onClose,
  labelledBy,
  children,
}: DialogProps): ReactElement {
  const dialogRef: RefObject<HTMLDialogElement | null> =
    useRef<HTMLDialogElement>(null);
  useScrollLock(isOpen);

  // The browser owns the open state of a <dialog>; this keeps it in step with React's.
  useEffect((): void => {
    const dialog: HTMLDialogElement | null = dialogRef.current;
    if (dialog === null) {
      return;
    }
    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={labelledBy}
      onClose={onClose}
    >
      {isOpen && children}
    </dialog>
  );
}

import { type ReactElement, type RefObject, useEffect, useRef } from 'react';

import { useScrollLock } from '@/hooks';

import styles from './dialog.module.scss';
import type { DialogProps } from './dialog.types';

export function Dialog({
  isOpen,
  onClose,
  labelledBy,
  children,
}: DialogProps): ReactElement {
  const dialogRef: RefObject<HTMLDialogElement | null> =
    useRef<HTMLDialogElement>(null);
  useScrollLock(isOpen);

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

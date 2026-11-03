import { type ReactElement, type RefObject, useCallback, useRef } from 'react';

import { MotionLayer, type MotionModule } from '@/motion/motionLayer';
import { assignRef, classNames } from '@/utils';

import styles from './section.module.scss';
import type { SectionProps } from './section.types';

// Loads the entrances (Vault, BoardReveal, PasteUp) as their own chunk. Every section uses the
// same loader, so the chunk is downloaded once (docs/ARCHITECTURE.md section 13).
async function loadEntranceMotion(): Promise<MotionModule> {
  const { EntranceMotion } =
    await import('@/motionComponents/entranceMotion/entranceMotion.component');
  return { default: EntranceMotion };
}

// One part of the page. `labelledBy` is required, so every section is a named region that
// screen reader users can jump to (brief section 8). Every section also gets the entrance
// motion, which animates the title, boards and posters it finds inside.
//
// tabIndex -1, like <main>: a link to the section (the navigation, "Skip the run", "Back to the
// summit") moves focus here, so a screen reader announces it and the next Tab continues inside
// it in every browser. It does not add the section to the Tab order.
export function Section({
  id,
  labelledBy,
  surface = 'plain',
  spacing = 'padded',
  className,
  ref,
  children,
}: SectionProps): ReactElement {
  // The section's own ref, the scope of its entrance motion. The parent's ref, if any, gets the
  // same element.
  const sectionRef: RefObject<HTMLElement | null> = useRef<HTMLElement>(null);
  const attachRef: (element: HTMLElement | null) => void = useCallback(
    (element: HTMLElement | null): void => {
      sectionRef.current = element;
      assignRef(ref, element);
    },
    [ref],
  );

  return (
    <section
      id={id}
      ref={attachRef}
      aria-labelledby={labelledBy}
      tabIndex={-1}
      className={classNames(
        styles.section,
        styles[surface],
        styles[spacing],
        className,
      )}
    >
      {children}
      <MotionLayer load={loadEntranceMotion} scope={sectionRef} />
    </section>
  );
}

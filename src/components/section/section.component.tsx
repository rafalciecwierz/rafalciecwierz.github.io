import { type ReactElement, type RefObject, useCallback, useRef } from 'react';

import { MotionLayer, type MotionModule } from '@/motion/motionLayer';
import { assignRef, classNames } from '@/utils';

import styles from './section.module.scss';
import type { SectionProps } from './section.types';

async function loadEntranceMotion(): Promise<MotionModule> {
  const { EntranceMotion } =
    await import('@/motionComponents/entranceMotion/entranceMotion.component');
  return { default: EntranceMotion };
}

export function Section({
  id,
  labelledBy,
  surface = 'plain',
  spacing = 'padded',
  className,
  ref,
  children,
}: SectionProps): ReactElement {
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

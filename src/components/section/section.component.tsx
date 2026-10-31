import type { ReactElement } from 'react';

import { classNames } from '@/utils';

import styles from './section.module.scss';
import type { SectionProps } from './section.types';

// One part of the page. `labelledBy` is required, so every section is a named region that
// screen reader users can jump to (brief section 8).
export function Section({
  id,
  labelledBy,
  surface = 'plain',
  spacing = 'padded',
  className,
  ref,
  children,
}: SectionProps): ReactElement {
  return (
    <section
      id={id}
      ref={ref}
      aria-labelledby={labelledBy}
      className={classNames(
        styles.section,
        styles[surface],
        styles[spacing],
        className,
      )}
    >
      {children}
    </section>
  );
}

import type { ReactElement } from 'react';

import { MiniBuilding } from '@/components/miniBuilding';

import styles from './moveCard.module.scss';
import type { MoveCardProps } from './moveCard.types';

// One move of the career: its building, then the card with the move's name and the company.
// The rest of the card (roles, dates, points, stack) comes in as children.
export function MoveCard({
  marks,
  title,
  buildingHeight,
  hasTower,
  children,
}: MoveCardProps): ReactElement {
  return (
    <div className={styles.moveCard}>
      <MiniBuilding height={buildingHeight} hasTower={hasTower} />
      <article className={styles.card}>
        <p className={styles.marks}>
          {marks.map((mark: string): ReactElement => (
            <span key={mark} className={styles.mark}>
              {mark}
            </span>
          ))}
        </p>
        <h3 className={styles.title}>{title}</h3>
        {children}
      </article>
    </div>
  );
}

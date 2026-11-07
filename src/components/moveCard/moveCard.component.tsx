import type { ReactElement } from 'react';

import { MiniBuilding } from '@/components/miniBuilding';
import { MOTION_TARGETS } from '@/constants';

import styles from './moveCard.module.scss';
import type { MoveCardProps } from './moveCard.types';

export function MoveCard({
  marks,
  currentMark,
  title,
  buildingHeight,
  hasTower,
  children,
}: MoveCardProps): ReactElement {
  return (
    <div
      className={styles.moveCard}
      data-motion-target={MOTION_TARGETS.careerMove}
    >
      <MiniBuilding height={buildingHeight} hasTower={hasTower} />
      <article className={styles.card}>
        <p className={styles.marks}>
          {marks.map((mark: string, index: number): ReactElement => (
            <span
              key={mark}
              className={styles.mark}
              data-motion-target={MOTION_TARGETS.careerMark}
              data-current={index === currentMark ? '' : undefined}
            >
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

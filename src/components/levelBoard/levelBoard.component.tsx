import type { ReactElement } from 'react';

import { MOTION_TARGETS } from '@/constants';
import { classNames } from '@/utils';

import styles from './levelBoard.module.scss';
import type { BoardRow, LevelBoardProps } from './levelBoard.types';

// One experience level as a board: its name, how many tools, what the level means, and the
// tools grouped in rows. The level is told three ways, never by colour alone: the title, the
// board's top edge (solid sodium, solid chalk, dashed) and the style of its chips.
export function LevelBoard({
  level,
  titleId,
  title,
  description,
  count,
  rows,
}: LevelBoardProps): ReactElement {
  return (
    <article
      className={classNames(styles.board, styles[level])}
      aria-labelledby={titleId}
      data-motion-target={MOTION_TARGETS.board}
    >
      <div className={styles.head}>
        <h3 id={titleId} className={styles.title}>
          {title}
        </h3>
        <span className={styles.count}>{count}</span>
      </div>
      <p className={styles.description}>{description}</p>
      {rows.map((row: BoardRow): ReactElement => (
        <div
          key={row.id}
          className={classNames(
            styles.row,
            row.isHighlighted && styles.highlighted,
          )}
        >
          <h4 className={styles.group}>{row.name}</h4>
          <ul className={styles.chips} aria-label={row.label}>
            {row.tools.map((tool: string): ReactElement => (
              <li
                key={tool}
                className={styles.chip}
                data-motion-target={MOTION_TARGETS.boardChip}
              >
                {tool}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </article>
  );
}

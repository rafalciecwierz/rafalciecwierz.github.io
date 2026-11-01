import type { ReactElement } from 'react';

import type { BoardRow } from '@/components';
import {
  AiBand,
  Box,
  Container,
  LevelBoard,
  Section,
  SectionHeading,
} from '@/components';
import { SECTION_IDS } from '@/constants';
import type { StackLevel } from '@/content';
import { anchorHref } from '@/utils';

import { BOARD_TITLE_PREFIX, STACK_TITLE_ID } from './stack.constants';
import styles from './stack.module.scss';
import type { StackProps } from './stack.types';
import { boardRows, toolTotal } from './stack.utils';

// "Kit": the AI band, then one board per experience level. Strong leads on its own; Medium and
// Low share the row below it.
export function Stack({ stack }: StackProps): ReactElement {
  function renderBoard(level: StackLevel): ReactElement {
    const rows: BoardRow[] = boardRows(stack, level);
    return (
      <LevelBoard
        level={level}
        titleId={`${BOARD_TITLE_PREFIX}${level}`}
        title={stack.levels[level].label}
        description={stack.levels[level].description}
        count={stack.toolCount(toolTotal(rows))}
        rows={rows}
      />
    );
  }

  return (
    <Section id={SECTION_IDS.stack} labelledBy={STACK_TITLE_ID}>
      <Container>
        <SectionHeading
          heading={stack.heading}
          titleId={STACK_TITLE_ID}
          intro={stack.intro}
        />
        <AiBand
          title={stack.ai.title}
          text={stack.ai.text}
          linkLabel={stack.ai.link}
          href={anchorHref(SECTION_IDS.process)}
        />
        <Box className={styles.boards}>
          {renderBoard('strong')}
          <Box className={styles.side}>
            {renderBoard('medium')}
            {renderBoard('low')}
          </Box>
        </Box>
      </Container>
    </Section>
  );
}

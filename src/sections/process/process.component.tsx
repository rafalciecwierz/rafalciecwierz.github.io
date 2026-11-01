import type { ReactElement } from 'react';

import {
  ActionGroup,
  Box,
  ButtonLink,
  Container,
  Heading,
  LeapScene,
  Section,
  SectionHeading,
  StatList,
  Text,
  Todo,
} from '@/components';
import { SECTION_IDS } from '@/constants';

import { PROCESS_TITLE_ID } from './process.constants';
import styles from './process.module.scss';
import type { ProcessProps } from './process.types';

// "The leap": AI and process (brief 4.8). The scene, then two columns: how Rafał works with AI
// (still a TODO) and how this site was made, with the numbers from the repository.
export function Process({ process }: ProcessProps): ReactElement {
  const { how, site } = process;

  return (
    <Section id={SECTION_IDS.process} labelledBy={PROCESS_TITLE_ID}>
      <Container>
        <SectionHeading
          heading={process.heading}
          titleId={PROCESS_TITLE_ID}
          intro={process.intro}
        />
        <Box className={styles.scene}>
          <LeapScene signs={process.sceneSigns} />
        </Box>
        <Box className={styles.columns}>
          <Box className={styles.column}>
            <Heading level={3} size="sm">
              {how.title}
            </Heading>
            {how.paragraphs === null ? (
              <Text>
                <Todo>{how.todo}</Todo>
              </Text>
            ) : (
              how.paragraphs.map((paragraph: string): ReactElement => (
                <Text key={paragraph} className={styles.text}>
                  {paragraph}
                </Text>
              ))
            )}
          </Box>
          <Box className={styles.column}>
            <Heading level={3} size="sm">
              {site.title}
            </Heading>
            {site.paragraphs.map((paragraph: string): ReactElement => (
              <Text key={paragraph} className={styles.text}>
                {paragraph}
              </Text>
            ))}
            <Box className={styles.facts}>
              <StatList stats={site.facts} size="small" />
            </Box>
            <Text variant="muted">{site.source}</Text>
            <Text>{site.role ?? <Todo>{site.roleTodo}</Todo>}</Text>
            {site.galleryUrl === null ? (
              <Text>
                <Todo>{site.galleryLabel}</Todo>
              </Text>
            ) : (
              <ActionGroup>
                <ButtonLink href={site.galleryUrl} variant="primary">
                  {site.galleryLabel}
                </ButtonLink>
              </ActionGroup>
            )}
          </Box>
        </Box>
      </Container>
    </Section>
  );
}

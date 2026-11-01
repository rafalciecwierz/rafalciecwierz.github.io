import type { ReactElement } from 'react';

import {
  Box,
  Container,
  Section,
  SectionHeading,
  StatList,
  Text,
} from '@/components';
import { SECTION_IDS } from '@/constants';

import { ABOUT_TITLE_ID } from './about.constants';
import styles from './about.module.scss';
import type { AboutProps } from './about.types';

// "Warm-up": who Rafał is, in three paragraphs, and four facts as big numbers on the wall.
export function About({ about }: AboutProps): ReactElement {
  return (
    <Section
      id={SECTION_IDS.about}
      labelledBy={ABOUT_TITLE_ID}
      surface="concrete"
    >
      <Container>
        <SectionHeading heading={about.heading} titleId={ABOUT_TITLE_ID} />
        <Box className={styles.layout}>
          <Box className={styles.text}>
            {about.paragraphs.map((paragraph: string): ReactElement => (
              <Text key={paragraph} variant="lead">
                {paragraph}
              </Text>
            ))}
          </Box>
          <StatList stats={about.facts} />
        </Box>
      </Container>
    </Section>
  );
}

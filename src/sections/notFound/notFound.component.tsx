import type { ReactElement } from 'react';

import {
  ActionGroup,
  Box,
  ButtonLink,
  Container,
  Heading,
  HeroBackdrop,
  Section,
  Text,
} from '@/components';
import { SECTION_IDS } from '@/constants';

import { NOT_FOUND_TITLE_ID } from './notFound.constants';
import styles from './notFound.module.scss';
import type { NotFoundProps } from './notFound.types';

// The 404 page: the hero's night city without the sign, a short line and the way back home.
export function NotFound({ notFound, homeUrl }: NotFoundProps): ReactElement {
  return (
    <Section
      id={SECTION_IDS.notFound}
      labelledBy={NOT_FOUND_TITLE_ID}
      spacing="none"
      className={styles.notFound}
    >
      <HeroBackdrop />
      <Container className={styles.container}>
        <Box className={styles.content}>
          <Text className={styles.kicker}>{notFound.kicker}</Text>
          <Heading level={1} size="lg" id={NOT_FOUND_TITLE_ID}>
            {notFound.title}
          </Heading>
          <Text variant="lead">{notFound.text}</Text>
          <ActionGroup className={styles.actions}>
            <ButtonLink href={homeUrl} variant="primary">
              {notFound.backHome}
            </ButtonLink>
          </ActionGroup>
        </Box>
      </Container>
    </Section>
  );
}

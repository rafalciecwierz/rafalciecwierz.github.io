import type { ReactElement } from 'react';

import { Box, Container, Poster, Section, SectionHeading } from '@/components';
import { SECTION_IDS } from '@/constants';
import type { Quote } from '@/content';
import { padNumber } from '@/utils';

import { TEAM_TITLE_ID } from './team.constants';
import styles from './team.module.scss';
import type { PosterLook, TeamProps } from './team.types';
import { posterLook } from './team.utils';

// "Spotters": recommendations from the team at Mood up, pasted on the wall as posters.
export function Team({ team }: TeamProps): ReactElement {
  return (
    <Section id={SECTION_IDS.team} labelledBy={TEAM_TITLE_ID}>
      <Container>
        <SectionHeading
          heading={team.heading}
          titleId={TEAM_TITLE_ID}
          intro={team.intro}
        />
        <Box className={styles.wall}>
          {team.quotes.map((quote: Quote, index: number): ReactElement => {
            const look: PosterLook = posterLook(index);
            return (
              <Poster
                key={quote.id}
                quote={quote}
                heading={team.posterHeading}
                number={padNumber(index)}
                caption={team.caption(quote.role, team.source)}
                tone={look.tone}
                tilt={look.tilt}
                isLead={index === 0}
              />
            );
          })}
        </Box>
      </Container>
    </Section>
  );
}

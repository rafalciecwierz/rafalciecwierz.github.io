import type { ReactElement } from 'react';

import {
  ActionGroup,
  Box,
  ButtonLink,
  Container,
  EducationNote,
  JobRoles,
  List,
  ListItem,
  MoveCard,
  PointList,
  Section,
  SectionHeading,
  TagList,
  Text,
} from '@/components';
import { SECTION_IDS } from '@/constants';
import type { Job } from '@/content';
import { anchorHref, formatPeriod, formatYearSpan } from '@/utils';

import { CAREER_TITLE_ID, NEXT_ROOF_HEIGHT } from './career.constants';
import styles from './career.module.scss';
import type { CareerProps } from './career.types';
import { buildingHeight, jobMoveNames, nextMoveName } from './career.utils';

// "The line": the jobs as moves up the rooftops, newest first, starting with the roof that is
// not built yet. This list is the whole career on every screen; the pinned run on wide screens
// is drawn on top of it later (task 3.15).
export function Career({ career, availability }: CareerProps): ReactElement {
  const moves: string[][] = jobMoveNames(career.jobs, career.moveNames);

  return (
    <Section id={SECTION_IDS.career} labelledBy={CAREER_TITLE_ID}>
      <Container>
        <SectionHeading
          heading={career.heading}
          titleId={CAREER_TITLE_ID}
          intro={career.intro}
        />
        <List kind="ordered" className={styles.moves}>
          <ListItem>
            <MoveCard
              marks={[nextMoveName(career.moveNames)]}
              title={career.next.company}
              buildingHeight={NEXT_ROOF_HEIGHT}
              hasTower={false}
            >
              <Text className={styles.role}>{career.next.role}</Text>
              <Text variant="muted" className={styles.dates}>
                {career.next.text} {availability}
              </Text>
              <ActionGroup className={styles.action}>
                <ButtonLink
                  href={anchorHref(SECTION_IDS.contact)}
                  variant="primary"
                >
                  {career.next.cta}
                </ButtonLink>
              </ActionGroup>
            </MoveCard>
          </ListItem>
          {career.jobs.map((job: Job, index: number): ReactElement => (
            <ListItem key={job.id}>
              <MoveCard
                marks={moves[index] ?? []}
                title={job.company}
                buildingHeight={buildingHeight(index)}
                hasTower={job.roles.length > 1}
              >
                <JobRoles roles={job.roles} promotedLabel={career.promoted} />
                <Text variant="muted" className={styles.dates}>
                  {formatPeriod(job.period)}
                </Text>
                <PointList points={job.points} />
                <Box className={styles.tags}>
                  <TagList tags={job.stack} label={career.stackLabel} />
                </Box>
              </MoveCard>
            </ListItem>
          ))}
        </List>
        <EducationNote
          label={career.educationLabel}
          school={career.education.school}
          detail={career.educationDetail(
            career.education.degree,
            formatYearSpan(career.education.years),
          )}
        />
      </Container>
    </Section>
  );
}

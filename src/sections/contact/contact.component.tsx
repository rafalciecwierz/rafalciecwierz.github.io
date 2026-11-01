import type { ReactElement } from 'react';

import {
  ActionGroup,
  Box,
  ButtonLink,
  ChannelList,
  ChannelRow,
  Container,
  EmailButton,
  EmailChannel,
  Section,
  SectionHeading,
  Text,
  TextLink,
  Todo,
} from '@/components';
import { SECTION_IDS } from '@/constants';
import { displayUrl } from '@/utils';

import { CONTACT_TITLE_ID } from './contact.constants';
import styles from './contact.module.scss';
import type { ContactProps } from './contact.types';

// "Climb with me.": availability, the channels and the CV. No phone number (brief 4.9).
export function Contact({ contact, profile }: ContactProps): ReactElement {
  return (
    <Section
      id={SECTION_IDS.contact}
      labelledBy={CONTACT_TITLE_ID}
      className={styles.contact}
    >
      <Container>
        <SectionHeading
          heading={contact.heading}
          titleId={CONTACT_TITLE_ID}
          size="large"
        />
        <Box className={styles.layout}>
          <Text className={styles.availability}>{profile.availability}</Text>
          <Box>
            <ChannelList>
              <ChannelRow label={contact.channels.email}>
                <EmailChannel email={profile.email} labels={contact} />
              </ChannelRow>
              <ChannelRow label={contact.channels.linkedin}>
                {profile.linkedinUrl === null ? (
                  <Todo>{contact.urlTodo}</Todo>
                ) : (
                  <TextLink href={profile.linkedinUrl}>
                    {contact.channels.linkedin}
                  </TextLink>
                )}
              </ChannelRow>
              <ChannelRow label={contact.channels.github}>
                <TextLink href={profile.githubUrl}>
                  {displayUrl(profile.githubUrl)}
                </TextLink>
              </ChannelRow>
              <ChannelRow label={contact.channels.calendly}>
                {profile.calendlyUrl === null ? (
                  <Todo>{contact.urlTodo}</Todo>
                ) : (
                  <TextLink href={profile.calendlyUrl}>
                    {contact.channels.calendly}
                  </TextLink>
                )}
              </ChannelRow>
            </ChannelList>
            <ActionGroup className={styles.actions}>
              <ButtonLink
                href={profile.cvUrl}
                variant="primary"
                icon="download"
                shouldDownload
              >
                {contact.downloadCv}
              </ButtonLink>
              <EmailButton email={profile.email} label={contact.writeEmail} />
            </ActionGroup>
          </Box>
        </Box>
      </Container>
    </Section>
  );
}

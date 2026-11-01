import type { Contact as ContactContent, Profile } from '@/content';

export type ContactProps = {
  contact: ContactContent;
  profile: Pick<
    Profile,
    | 'availability'
    | 'email'
    | 'githubUrl'
    | 'linkedinUrl'
    | 'calendlyUrl'
    | 'cvUrl'
  >;
};

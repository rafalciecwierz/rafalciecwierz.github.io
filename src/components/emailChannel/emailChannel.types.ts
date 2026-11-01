import type { Contact } from '@/content';
import type { EmailParts } from '@/utils';

export type EmailChannelProps = {
  email: EmailParts;
  labels: Pick<
    Contact,
    'copy' | 'copyLabel' | 'copied' | 'copiedStatus' | 'selected'
  >;
};

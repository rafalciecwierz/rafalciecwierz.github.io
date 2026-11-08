import type { BadgeVariant } from '@/components/badge';
import type { ProjectStatus } from '@/content';

export const STATUS_BADGES: Readonly<Record<ProjectStatus, BadgeVariant>> = {
  live: 'solid',
  inProgress: 'caution',
  archived: 'muted',
};

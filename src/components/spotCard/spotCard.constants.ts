import type { BadgeVariant } from '@/components/badge';
import type { ProjectStatus } from '@/content';

// The badge for each project status.
export const STATUS_BADGES: Readonly<Record<ProjectStatus, BadgeVariant>> = {
  live: 'solid',
  inProgress: 'caution',
  archived: 'muted',
};

import { Fragment, type ReactElement } from 'react';

import { Badge } from '@/components/badge';
import { Icon } from '@/components/icon';
import { MOTION_TARGETS } from '@/constants';

import styles from './jobRoles.module.scss';
import type { JobRolesProps } from './jobRoles.types';

// The roles held at one company, in order. More than one role is a promotion: the roles are
// joined by an arrow (an icon, hidden from screen readers, which read the roles as a sequence)
// and end with a "Promoted" badge, so the promotion is said in words, not shown by the arrow alone.
// The promotion (the arrow, the later roles and the badge) is marked for the pinned career run,
// which dims it until the runner reaches the tower.
export function JobRoles({
  roles,
  promotedLabel,
}: JobRolesProps): ReactElement {
  const isPromoted: boolean = roles.length > 1;

  return (
    <p className={styles.jobRoles}>
      {roles.map((role: string, index: number): ReactElement => (
        <Fragment key={role}>
          {index > 0 && (
            <span
              className={styles.arrow}
              data-motion-target={MOTION_TARGETS.careerPromotion}
            >
              <Icon name="arrowRight" />
            </span>
          )}
          <span
            data-motion-target={
              index > 0 ? MOTION_TARGETS.careerPromotion : undefined
            }
          >
            {role}
          </span>
        </Fragment>
      ))}
      {isPromoted && (
        <span
          className={styles.badge}
          data-motion-target={MOTION_TARGETS.careerPromotion}
        >
          <Badge variant="solid">{promotedLabel}</Badge>
        </span>
      )}
    </p>
  );
}

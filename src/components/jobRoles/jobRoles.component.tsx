import { Fragment, type ReactElement } from 'react';

import { Badge } from '@/components/badge';
import { Icon } from '@/components/icon';
import { MOTION_TARGETS } from '@/constants';

import styles from './jobRoles.module.scss';
import type { JobRolesProps } from './jobRoles.types';

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

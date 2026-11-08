import type { ReactElement } from 'react';

import { Badge } from '@/components/badge';
import { Button } from '@/components/button';
import { TagList } from '@/components/tagList';
import { TextLink } from '@/components/textLink';
import { classNames } from '@/utils';

import { STATUS_BADGES } from './spotCard.constants';
import styles from './spotCard.module.scss';
import type { SpotCardProps } from './spotCard.types';

export function SpotCard({
  project,
  number,
  labels,
  isHot,
  onHover,
  onOpen,
  openButtonRef,
}: SpotCardProps): ReactElement {
  function handleEnter(): void {
    onHover(true);
  }
  function handleLeave(): void {
    onHover(false);
  }

  return (
    <li>
      <div
        className={classNames(styles.spotCard, isHot && styles.hot)}
        onPointerEnter={handleEnter}
        onPointerLeave={handleLeave}
      >
        <span className={styles.number} aria-hidden="true">
          {number}
        </span>
        <div>
          <p className={styles.label}>
            {labels.spotLabel(number)}
            <Badge variant={STATUS_BADGES[project.status]}>
              {labels.statusLabels[project.status]}
            </Badge>
          </p>
          <h3 className={styles.name}>{project.name}</h3>
          {project.note !== undefined && (
            <p className={styles.note}>{project.note}</p>
          )}
          <p className={styles.description}>{project.description}</p>
          <div className={styles.tags}>
            <TagList tags={project.tags} label={labels.tagsLabel} />
          </div>
          {(project.repoUrl !== undefined || project.demoUrl !== undefined) && (
            <p className={styles.links}>
              {project.repoUrl !== undefined && (
                <TextLink href={project.repoUrl} icon="arrowUpRight">
                  {labels.repoLink}
                </TextLink>
              )}
              {project.demoUrl !== undefined && (
                <TextLink href={project.demoUrl} icon="arrowUpRight">
                  {labels.demoLink}
                </TextLink>
              )}
            </p>
          )}
          <div className={styles.more}>
            <Button
              ref={openButtonRef}
              icon="arrowRight"
              aria-haspopup="dialog"
              aria-label={labels.panel.openFor(project.name)}
              onFocus={handleEnter}
              onBlur={handleLeave}
              onClick={onOpen}
            >
              {labels.panel.open}
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
}

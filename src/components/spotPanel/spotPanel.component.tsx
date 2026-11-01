import type { ReactElement } from 'react';

import { ActionGroup } from '@/components/actionGroup';
import { Badge } from '@/components/badge';
import { Button } from '@/components/button';
import { ButtonLink } from '@/components/buttonLink';
import { STATUS_BADGES } from '@/components/spotCard';
import { SpotMap } from '@/components/spotMap';
import { TagList } from '@/components/tagList';
import { Todo } from '@/components/todo';
import { padNumber } from '@/utils';

import styles from './spotPanel.module.scss';
import type { PanelField, SpotPanelProps } from './spotPanel.types';

// The details of one project, shown in the dialog: the map zoomed on its pin, what it is, its
// stack, and the fields Rafał still has to write (a visible TODO until then, task 3.18).
export function SpotPanel({
  project,
  index,
  pins,
  labels,
  titleId,
  onClose,
}: SpotPanelProps): ReactElement {
  const number: string = padNumber(index);
  const fields: PanelField[] = [
    { field: labels.panel.role, value: project.role },
    { field: labels.panel.learned, value: project.learned },
  ];

  return (
    <>
      <div className={styles.top}>
        <p className={styles.label}>
          {labels.spotLabel(number)}
          <Badge variant={STATUS_BADGES[project.status]}>
            {labels.statusLabels[project.status]}
          </Badge>
        </p>
        <Button variant="strong" onClick={onClose}>
          {labels.panel.close}
        </Button>
      </div>
      <div className={styles.body}>
        <div className={styles.zoom}>
          <SpotMap pins={pins} hotIndex={null} zoomIndex={index} />
        </div>
        <h2 id={titleId} className={styles.title}>
          {project.name}
        </h2>
        {project.note !== undefined && (
          <p className={styles.note}>{project.note}</p>
        )}
        <h3 className={styles.heading}>{labels.panel.description}</h3>
        <p className={styles.text}>{project.description}</p>
        <h3 className={styles.heading}>{labels.panel.stack}</h3>
        <TagList tags={project.tags} label={labels.panel.stack} />
        <h3 className={styles.heading}>{labels.panel.screenshot.label}</h3>
        {project.screenshot === null ? (
          <p className={styles.text}>
            <Todo>{labels.panel.screenshot.todo}</Todo>
          </p>
        ) : (
          <img
            className={styles.screenshot}
            src={project.screenshot.src}
            alt={project.screenshot.alt}
            loading="lazy"
          />
        )}
        {fields.map(({ field, value }: PanelField): ReactElement => (
          <div key={field.label}>
            <h3 className={styles.heading}>{field.label}</h3>
            <p className={styles.text}>{value ?? <Todo>{field.todo}</Todo>}</p>
          </div>
        ))}
        {(project.repoUrl !== undefined || project.demoUrl !== undefined) && (
          <ActionGroup className={styles.links}>
            {project.repoUrl !== undefined && (
              <ButtonLink
                href={project.repoUrl}
                variant="secondary"
                icon="arrowUpRight"
              >
                {labels.repoLink}
              </ButtonLink>
            )}
            {project.demoUrl !== undefined && (
              <ButtonLink
                href={project.demoUrl}
                variant="secondary"
                icon="arrowUpRight"
              >
                {labels.demoLink}
              </ButtonLink>
            )}
          </ActionGroup>
        )}
      </div>
    </>
  );
}

import type { ReactElement } from 'react';

import { MOTION_TARGETS } from '@/constants';
import type { Job } from '@/content';
import { classNames } from '@/utils';

import { careerRunLayout } from './careerRunLayout.utils';
import { FAR_WINDOW } from './careerRunScene.constants';
import styles from './careerRunScene.module.scss';
import type {
  CareerRunLayout,
  CareerRunSceneProps,
  FarBuilding,
  RunBuilding as RunBuildingSpec,
  RunWindow,
  WorldBox,
} from './careerRunScene.types';
import { farBox, farBuildings, roleCountsOf } from './careerRunScene.utils';
import { RunBuilding } from './runBuilding.component';
import { RunNextRoof } from './runNextRoof.component';
import { RunStreet } from './runStreet.component';

function viewBoxOf(box: WorldBox): string {
  return `${String(box.minX)} ${String(box.minY)} ${String(box.width)} ${String(box.height)}`;
}

// "The line" as one city: a building per company (oldest on the left), a tower per promotion,
// the unbuilt next roof, the street and the far city behind. Drawn at build time and hidden:
// only the pinned career run (CareerRunMotion, 900 px and wider, motion allowed) shows it,
// moving the two layers with CSS transforms. Decorative: the list of jobs says it all in words.
// Each layer is drawn in its own units at 1 px per unit; the motion only translates and
// scales it, so the browser never has to paint the SVG again while it scrolls.
export function CareerRunScene({
  jobs,
  promotedLabel,
  nextSign,
  children,
}: CareerRunSceneProps): ReactElement {
  const oldestFirst: Job[] = [...jobs].reverse();
  const layout: CareerRunLayout = careerRunLayout(roleCountsOf(jobs));
  const far: WorldBox = farBox();
  const bottom: number = layout.box.minY + layout.box.height;

  return (
    <div className={styles.careerRunScene} aria-hidden="true">
      <svg
        className={classNames(styles.layer, styles.far)}
        viewBox={viewBoxOf(far)}
        width={far.width}
        height={far.height}
        focusable="false"
        data-motion-target={MOTION_TARGETS.careerFar}
      >
        {farBuildings().map((building: FarBuilding): ReactElement => (
          <g key={building.key}>
            <rect
              className={styles.farBuilding}
              x={building.x}
              y={building.y}
              width={building.width}
              height={building.height}
            />
            {building.windows.map((window: RunWindow): ReactElement => (
              <rect
                key={window.key}
                className={styles.farWindow}
                x={window.x}
                y={window.y}
                width={FAR_WINDOW.width}
                height={FAR_WINDOW.height}
              />
            ))}
          </g>
        ))}
      </svg>
      <svg
        className={styles.layer}
        viewBox={viewBoxOf(layout.box)}
        width={layout.box.width}
        height={layout.box.height}
        focusable="false"
        data-motion-target={MOTION_TARGETS.careerWorld}
      >
        <RunStreet box={layout.box} />
        {layout.buildings.map(
          (building: RunBuildingSpec, index: number): ReactElement | null => {
            const job: Job | undefined = oldestFirst[index];
            return job === undefined ? null : (
              <RunBuilding
                key={job.id}
                building={building}
                job={job}
                promotedLabel={promotedLabel}
                bottom={bottom}
              />
            );
          },
        )}
        <RunNextRoof roof={layout.next} sign={nextSign} />
      </svg>
      {children}
    </div>
  );
}

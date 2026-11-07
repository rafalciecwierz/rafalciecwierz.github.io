import { type ReactElement, type RefObject, useRef, useState } from 'react';

import { Dialog } from '@/components/dialog';
import { SpotCard } from '@/components/spotCard';
import { type MapPoint, pinPositions, SpotMap } from '@/components/spotMap';
import { SpotPanel } from '@/components/spotPanel';
import type { Project } from '@/content';
import { padNumber } from '@/utils';

import { PANEL_TITLE_ID } from './spotBoard.constants';
import styles from './spotBoard.module.scss';
import type { SpotBoardProps } from './spotBoard.types';

export function SpotBoard({ projects }: SpotBoardProps): ReactElement {
  const [hotIndex, setHotIndex] = useState<number | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const openButtons: RefObject<(HTMLButtonElement | null)[]> = useRef<
    (HTMLButtonElement | null)[]
  >([]);
  const returnFocusIndex: RefObject<number | null> = useRef<number | null>(
    null,
  );
  const pins: MapPoint[] = pinPositions(
    projects.items.map((project: Project): string => project.name),
  );
  const openProject: Project | undefined =
    openIndex === null ? undefined : projects.items[openIndex];

  function openPanel(index: number): void {
    returnFocusIndex.current = index;
    setOpenIndex(index);
  }

  function closePanel(): void {
    setOpenIndex(null);
  }

  function handleDialogClosed(): void {
    const index: number | null = returnFocusIndex.current;
    returnFocusIndex.current = null;
    if (index !== null) {
      openButtons.current[index]?.focus();
    }
    setOpenIndex(null);
  }

  return (
    <div className={styles.spotBoard}>
      <div className={styles.map}>
        <SpotMap
          pins={pins}
          hotIndex={hotIndex}
          onPinHover={setHotIndex}
          onPinClick={openPanel}
        />
      </div>
      <div>
        <ol className={styles.list}>
          {projects.items.map(
            (project: Project, index: number): ReactElement => (
              <SpotCard
                key={project.id}
                project={project}
                number={padNumber(index)}
                labels={projects}
                isHot={hotIndex === index}
                onHover={(isHot: boolean): void => {
                  setHotIndex(isHot ? index : null);
                }}
                onOpen={(): void => {
                  openPanel(index);
                }}
                openButtonRef={(button: HTMLButtonElement | null): void => {
                  openButtons.current[index] = button;
                }}
              />
            ),
          )}
        </ol>
        <p className={styles.count}>{projects.count(projects.items.length)}</p>
      </div>
      <Dialog
        isOpen={openProject !== undefined}
        onClose={handleDialogClosed}
        labelledBy={PANEL_TITLE_ID}
      >
        {openProject !== undefined && openIndex !== null && (
          <SpotPanel
            project={openProject}
            index={openIndex}
            pins={pins}
            labels={projects}
            titleId={PANEL_TITLE_ID}
            onClose={closePanel}
          />
        )}
      </Dialog>
    </div>
  );
}

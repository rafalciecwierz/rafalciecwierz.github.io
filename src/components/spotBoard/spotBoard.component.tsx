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

// The projects as a map and a list that know about each other: pointing at a card lights its
// pin and the reverse, and a card's button opens the project's details. It holds that state,
// so the section stays a plain composition. The list grows from the content alone.
export function SpotBoard({ projects }: SpotBoardProps): ReactElement {
  const [hotIndex, setHotIndex] = useState<number | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // Each card's "Spot details" button. The browser returns focus to whatever had it before the
  // dialog opened, but Safari does not focus a button when it is clicked, so focus goes back
  // to the opener explicitly.
  const openButtons: RefObject<(HTMLButtonElement | null)[]> = useRef<
    (HTMLButtonElement | null)[]
  >([]);
  const pins: MapPoint[] = pinPositions(
    projects.items.map((project: Project): string => project.name),
  );
  const openProject: Project | undefined =
    openIndex === null ? undefined : projects.items[openIndex];

  function closePanel(): void {
    if (openIndex !== null) {
      openButtons.current[openIndex]?.focus();
    }
    setOpenIndex(null);
  }

  return (
    <div className={styles.spotBoard}>
      <div className={styles.map}>
        <SpotMap pins={pins} hotIndex={hotIndex} onPinHover={setHotIndex} />
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
                  setOpenIndex(index);
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
        onClose={closePanel}
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

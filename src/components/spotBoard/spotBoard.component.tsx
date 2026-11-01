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
// pin and the reverse, and a card's button or its pin opens the project's details. It holds
// that state, so the section stays a plain composition. The list grows from the content alone.
export function SpotBoard({ projects }: SpotBoardProps): ReactElement {
  const [hotIndex, setHotIndex] = useState<number | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // Each card's "Spot details" button, and the project whose button gets focus back when the
  // panel closes.
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

  // The panel's Close button: the Dialog closes when the state says so.
  function closePanel(): void {
    setOpenIndex(null);
  }

  // The dialog has closed (Close, Escape): focus goes back to the project's card button. The
  // browser's own focus return is not enough. It restores only what had focus before the
  // dialog opened, and Safari does not focus a clicked button, a pin cannot hold focus, and
  // Chrome skips it when the Close button leaves the page before the dialog closes. Focusing
  // in closePanel() fails too, because the page behind an open modal dialog is inert. The
  // dialog's close event comes after it has closed, when the page can take focus again.
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

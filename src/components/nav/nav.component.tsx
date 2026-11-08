import { type ReactElement, useMemo } from 'react';

import { Button } from '@/components/button';
import type { NavLink } from '@/content';
import { useActiveSection } from '@/hooks';
import { anchorHref, classNames } from '@/utils';

import { NAV_ID } from './nav.constants';
import styles from './nav.module.scss';
import type { MobileMenu, NavProps } from './nav.types';
import { useMobileMenu } from './useMobileMenu.hook';

export function Nav({ nav }: NavProps): ReactElement {
  const { isOpen, open, close, panelRef, buttonRef }: MobileMenu =
    useMobileMenu();
  const sectionIds: string[] = useMemo<string[]>(
    (): string[] => nav.links.map((link: NavLink): string => link.sectionId),
    [nav.links],
  );
  const activeId: string | null = useActiveSection(sectionIds);

  return (
    <>
      <span className={styles.menuButton}>
        <Button
          ref={buttonRef}
          variant="strong"
          aria-expanded={isOpen}
          aria-controls={NAV_ID}
          onClick={open}
        >
          {nav.menu}
        </Button>
      </span>
      <nav
        id={NAV_ID}
        ref={panelRef}
        aria-label={nav.label}
        className={classNames(styles.nav, isOpen && styles.open)}
      >
        <ul className={styles.list}>
          {nav.links.map((link: NavLink): ReactElement => (
            <li key={link.sectionId}>
              <a
                href={anchorHref(link.sectionId)}
                className={styles.link}
                aria-current={
                  link.sectionId === activeId ? 'location' : undefined
                }
                onClick={close}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <span className={styles.closeButton}>
          <Button variant="strong" onClick={close}>
            {nav.close}
          </Button>
        </span>
      </nav>
    </>
  );
}

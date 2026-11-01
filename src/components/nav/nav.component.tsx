import type { ReactElement } from 'react';

import { Button } from '@/components/button';
import type { NavLink } from '@/content';
import { anchorHref, classNames } from '@/utils';

import { NAV_ID } from './nav.constants';
import styles from './nav.module.scss';
import type { MobileMenu, NavProps } from './nav.types';
import { useMobileMenu } from './useMobileMenu.hook';

// The anchor links to the sections. On wide screens they sit in the header. Below 760px the
// same list becomes a full-screen menu behind a Menu button, so the links exist only once.
// A link closes the menu, and the browser then jumps to the section.
export function Nav({ nav }: NavProps): ReactElement {
  // Destructured, so the refs and the state are separate values (the React Compiler treats a
  // whole object as a ref when it holds one).
  const { isOpen, open, close, panelRef, buttonRef }: MobileMenu =
    useMobileMenu();

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

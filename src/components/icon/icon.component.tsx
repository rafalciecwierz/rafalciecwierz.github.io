import type { ReactElement } from 'react';

import { ICON_PATHS, ICON_STROKE_WIDTH, ICON_VIEW_BOX } from './icon.constants';
import styles from './icon.module.scss';
import type { IconProps } from './icon.types';

// A decorative icon next to a text label. The label names the action, so the icon is hidden
// from screen readers. It takes the text colour and size.
export function Icon({ name }: IconProps): ReactElement {
  return (
    <svg
      className={styles.icon}
      viewBox={ICON_VIEW_BOX}
      fill="none"
      stroke="currentColor"
      strokeWidth={ICON_STROKE_WIDTH}
      strokeLinecap="square"
      aria-hidden="true"
      focusable="false"
    >
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}

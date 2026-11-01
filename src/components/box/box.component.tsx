import type { ReactElement } from 'react';

import type { BoxProps } from './box.types';

// A plain block for a section's own layout. Sections contain no HTML tags
// (docs/ARCHITECTURE.md section 6), so the grid that places their parts is a Box with a class
// from the section's CSS Module. It has no look of its own.
export function Box({ className, children }: BoxProps): ReactElement {
  return <div className={className}>{children}</div>;
}

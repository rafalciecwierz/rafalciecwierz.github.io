import type { ReactElement } from 'react';

import type { BoxProps } from './box.types';

export function Box({ className, children }: BoxProps): ReactElement {
  return <div className={className}>{children}</div>;
}

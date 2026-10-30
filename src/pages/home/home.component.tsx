import type { ReactElement } from 'react';

import { Placeholder } from '@/components';
import { content } from '@/content';

export function HomePage(): ReactElement {
  return <Placeholder profile={content.profile} />;
}

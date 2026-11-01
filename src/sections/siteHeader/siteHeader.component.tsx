import type { ReactElement } from 'react';

import { Brand, HeaderBar, Nav } from '@/components';
import { SECTION_IDS } from '@/constants';
import { anchorHref } from '@/utils';

import type { SiteHeaderProps } from './siteHeader.types';

export function SiteHeader({
  nav,
  brand,
  initials,
}: SiteHeaderProps): ReactElement {
  return (
    <HeaderBar>
      <Brand
        href={anchorHref(SECTION_IDS.hero)}
        initials={initials}
        text={brand.text}
        accessibleName={brand.accessibleName(initials, brand.text)}
      />
      <Nav nav={nav} />
    </HeaderBar>
  );
}

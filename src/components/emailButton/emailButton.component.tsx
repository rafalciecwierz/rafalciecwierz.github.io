import type { ReactElement } from 'react';

import { ButtonLink } from '@/components/buttonLink';
import { useIsHydrated } from '@/hooks';
import { joinEmail } from '@/utils';

import type { EmailButtonProps } from './emailButton.types';

export function EmailButton({
  email,
  label,
}: EmailButtonProps): ReactElement | null {
  const isHydrated: boolean = useIsHydrated();
  if (!isHydrated) {
    return null;
  }
  return (
    <ButtonLink href={`mailto:${joinEmail(email)}`} variant="secondary">
      {label}
    </ButtonLink>
  );
}

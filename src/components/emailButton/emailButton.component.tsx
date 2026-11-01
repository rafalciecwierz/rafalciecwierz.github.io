import type { ReactElement } from 'react';

import { ButtonLink } from '@/components/buttonLink';
import { useIsHydrated } from '@/hooks';
import { joinEmail } from '@/utils';

import type { EmailButtonProps } from './emailButton.types';

// "Write an email": a mailto link, added after hydration for the same reason as EmailChannel.
// It comes last in its row, so nothing moves when it appears.
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

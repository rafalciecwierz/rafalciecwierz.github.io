import { type ReactElement, type RefObject, useRef } from 'react';

import { Button } from '@/components/button';
import { TextLink } from '@/components/textLink';
import { VisuallyHidden } from '@/components/visuallyHidden';
import {
  type CopyToClipboard,
  useCopyToClipboard,
  useIsHydrated,
} from '@/hooks';
import { joinEmail } from '@/utils';

import styles from './emailChannel.module.scss';
import type { EmailChannelProps } from './emailChannel.types';

export function EmailChannel({
  email,
  labels,
}: EmailChannelProps): ReactElement {
  const isHydrated: boolean = useIsHydrated();
  const linkRef: RefObject<HTMLAnchorElement | null> =
    useRef<HTMLAnchorElement>(null);
  const { result, copy }: CopyToClipboard = useCopyToClipboard();

  if (!isHydrated) {
    return <span className={styles.reserved} />;
  }

  const address: string = joinEmail(email);
  const isCopied: boolean = result === 'copied';
  let status: string = '';
  if (result === 'copied') {
    status = labels.copiedStatus;
  } else if (result === 'selected') {
    status = labels.selected;
  }

  return (
    <span className={styles.emailChannel}>
      <TextLink ref={linkRef} href={`mailto:${address}`}>
        {address}
      </TextLink>
      <Button
        variant={isCopied ? 'solid' : 'outline'}
        size="small"
        aria-label={isCopied ? labels.copied : labels.copyLabel}
        onClick={(): void => {
          copy(address, linkRef.current);
        }}
      >
        {isCopied ? labels.copied : labels.copy}
      </Button>
      <VisuallyHidden live="polite">{status}</VisuallyHidden>
    </span>
  );
}

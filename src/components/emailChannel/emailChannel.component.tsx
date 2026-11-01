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

// The email address with a Copy button. The address is joined from its parts only after
// hydration, so it is never in the pre-rendered HTML (brief section 4.9); until then its line
// is reserved, so nothing below moves when it appears. If the clipboard is blocked, the address
// is selected instead, and a live region tells screen reader users either way.
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

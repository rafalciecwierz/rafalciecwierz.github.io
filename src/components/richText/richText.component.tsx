import { Fragment, type ReactElement } from 'react';

import { TextLink } from '@/components/textLink';
import type { LinkedText } from '@/content';

import type { RichTextProps } from './richText.types';

// Copy from the content layer that may hold links, as inline content for a paragraph (Text).
// A plain string is shown as it is; in a list of parts, the linked ones become inline links.
// The parts never change order, so their position is a stable key.
export function RichText({ text }: RichTextProps): ReactElement {
  if (typeof text === 'string') {
    return <>{text}</>;
  }

  return (
    <>
      {text.map((part: string | LinkedText, index: number): ReactElement => (
        <Fragment key={index}>
          {typeof part === 'string' ? (
            part
          ) : (
            <TextLink href={part.linkUrl}>{part.text}</TextLink>
          )}
        </Fragment>
      ))}
    </>
  );
}

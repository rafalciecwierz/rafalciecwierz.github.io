import { Fragment, type ReactElement } from 'react';

import { TextLink } from '@/components/textLink';
import type { LinkedText } from '@/content';

import type { RichTextProps } from './richText.types';

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

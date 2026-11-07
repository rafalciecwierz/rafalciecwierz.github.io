import type { ReactNode, Ref } from 'react';

export type FooterStreetProps = {
  bubble: string;
  ref?: Ref<HTMLDivElement> | undefined;
  children?: ReactNode;
};

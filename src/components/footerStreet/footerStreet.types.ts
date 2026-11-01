import type { ReactNode, Ref } from 'react';

export type FooterStreetProps = {
  // "Thanks for training with me!"
  bubble: string;
  // The street, for the motion layer that animates the landing.
  ref?: Ref<HTMLDivElement> | undefined;
  // The motion layer, placed inside the street so its drawing lines up with it.
  children?: ReactNode;
};

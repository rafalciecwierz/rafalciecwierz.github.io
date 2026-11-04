// The street lamp, drawn with its post at x = 0 and the street at y = 170 (the street's height
// in px). The light cone reaches 60 units left of the post and 130 right of it. The view box
// starts 24 units above the street, so the squirrel on the lamp head fits; the SVG is as many
// px taller than the street (footerStreet.module.scss), so one unit is still one px.
export const LAMP_VIEW_BOX: string = '-60 -24 190 194';
export const LAMP_POST_PATH: string = 'M0 170 V20 Q0 10 30 12';
export const LAMP_LIGHT_PATH: string = 'M22 14 L-60 170 H130 L44 14 Z';
export const LAMP_HEAD = { x: 20, y: 8, width: 26, height: 6 } as const;

// A squirrel sitting on the lamp head, facing the runner, for Rafał's girlfriend (task 3.19).
// Drawn facing left with her feet at (0, 0), then mirrored to face right and moved onto the
// lamp head's top edge (y = 8).
export const SQUIRREL_TRANSFORM: string = 'translate(30 8) scale(-1.25 1.25)';
// The tail: a bushy S rising behind her back, its tip curled forward.
export const SQUIRREL_TAIL_PATH: string =
  'M1.5 -1.5 C7 -1 11.5 -4.5 10.5 -10 C9.8 -13.5 11 -16 10 -18.5 C8.8 -21.5 4.5 -22 3.5 -19 C2.8 -17 4.5 -15.8 5.6 -16.6 C6 -13 5.5 -9 3 -6 Z';
// The body sitting upright, a round head with a pointed ear, and a front paw held to the chest.
export const SQUIRREL_BODY_PATH: string =
  'M-4 0 C-5.5 -3 -5 -7 -2.5 -8.8 C-5.6 -9.6 -6.9 -11 -6.7 -12.6 C-6.5 -14.4 -5.1 -15.4 -3.8 -15.5 L-3.1 -18 L-1.8 -15.3 C-0.2 -14.6 0.6 -12.8 0 -11 C2.3 -9 3 -4 2 0 Z M-2.8 -7 C-4.6 -7.5 -5.7 -6.6 -5.1 -5.8 C-4.5 -5.3 -3.4 -5.8 -2.8 -6.2 Z';
export const SQUIRREL_EYE = { cx: -4.3, cy: -13.2, r: 0.6 } as const;

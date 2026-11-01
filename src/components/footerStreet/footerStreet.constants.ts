// The street lamp, drawn with its post at x = 0 and the street at y = 170 (the street's height
// in px). The light cone reaches 60 units left of the post and 130 right of it.
export const LAMP_VIEW_BOX: string = '-60 0 190 170';
export const LAMP_POST_PATH: string = 'M0 170 V20 Q0 10 30 12';
export const LAMP_LIGHT_PATH: string = 'M22 14 L-60 170 H130 L44 14 Z';
export const LAMP_HEAD = { x: 20, y: 8, width: 26, height: 6 } as const;

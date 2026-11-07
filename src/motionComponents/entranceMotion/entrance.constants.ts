export const VAULT = {
  duration: 0.64,
  stagger: 0.038,
  ease: 'power1.out',
  start: { x: -0.5, y: -0.9, rotation: -28, opacity: 0 },
  apex: { x: -0.18, y: -1.05, rotation: -12, opacity: 1 },
  squash: { y: 0.03, scaleX: 1.08, scaleY: 0.84 },
  triggerStart: 'top 88%',
} as const;

export const LINEAR_BETWEEN_KEYFRAMES: string = 'none';

export const BOARD_REVEAL = {
  duration: 0.42,
  stagger: 0.026,
  ease: 'back.out(1.7)',
  rise: 14,
  triggerStart: 'top 90%',
} as const;

export const PASTE_UP = {
  duration: 0.56,
  delayPerPoster: 0.16,
  ease: 'power2.out',
  drop: -26,
  overshoot: 2,
  startTurn: -4,
  swingTurn: 1.4,
  startScale: 1.05,
  swingScale: 0.99,
  triggerStart: '25% bottom',
} as const;

export const KINETIC_LETTER_SELECTOR: string = '[data-kinetic-letter]';

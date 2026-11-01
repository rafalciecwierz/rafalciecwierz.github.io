// The entrances of the reference design (design/iterations/08-ascent-dark-v2.html): Vault,
// BoardReveal and PasteUp. Each plays once, when its element comes into view.

// Vault: each letter of a section title leaves on an arc, rolls and lands with a squash, like
// a precision jump. Distances are in em (multiples of the title's font size), so the jump
// scales with the title; they are turned into pixels once per title, because GSAP converting
// em itself measures every letter with a helper element.
export const VAULT = {
  duration: 0.64,
  stagger: 0.038,
  ease: 'power1.out',
  // Where a letter starts: up and to the left, turned back, invisible.
  start: { x: -0.5, y: -0.9, rotation: -28, opacity: 0 },
  // The top of the arc, at 42% of the move.
  apex: { x: -0.18, y: -1.05, rotation: -12, opacity: 1 },
  // The landing, at 78%: a little below the line, squashed.
  squash: { y: 0.03, scaleX: 1.08, scaleY: 0.84 },
  // When the title's top passes 88% of the screen's height.
  triggerStart: 'top 88%',
} as const;

// One ease over a whole keyframe move and straight lines between its keyframes, as the
// reference's Web Animations easing does.
export const LINEAR_BETWEEN_KEYFRAMES: string = 'none';

// BoardReveal: the tools on a stack board rise into place one after another.
export const BOARD_REVEAL = {
  duration: 0.42,
  stagger: 0.026,
  ease: 'back.out(1.7)',
  rise: 14,
  triggerStart: 'top 90%',
} as const;

// PasteUp: each poster is slapped onto the wall, overshooting its tilt. The angles are
// multiples of the poster's own tilt (in degrees): it starts turned four times the other way,
// swings 40% past its tilt, and settles on it.
export const PASTE_UP = {
  duration: 0.56,
  // Posters next to each other follow one another.
  delayPerPoster: 0.16,
  ease: 'power2.out',
  drop: -26,
  overshoot: 2,
  startTurn: -4,
  swingTurn: 1.4,
  startScale: 1.05,
  swingScale: 0.99,
  // When a quarter of the poster is on screen.
  triggerStart: '25% bottom',
} as const;

// KineticText marks each letter of a title with this attribute.
export const KINETIC_LETTER_SELECTOR: string = '[data-kinetic-letter]';

// Names for the static elements a motion component animates. The component marks an element
// with `data-motion-target="<name>"`, and the motion component finds it inside its scope with
// motionTarget(). One list, so the two sides can never disagree on a name.
export const MOTION_TARGETS = {
  streetRunner: 'street-runner',
  streetBubble: 'street-bubble',
  leapCamera: 'leap-camera',
  leapFog: 'leap-fog',
  leapRunner: 'leap-runner',
  leapReplay: 'leap-replay',
  vaultTitle: 'vault-title',
  board: 'board',
  boardChip: 'board-chip',
  poster: 'poster',
  heroRunner: 'hero-runner',
  heroRole: 'hero-role',
  roleFlip: 'role-flip',
  skylineWindow: 'skyline-window',
  careerMove: 'career-move',
  careerMark: 'career-mark',
  careerPromotion: 'career-promotion',
  careerWorld: 'career-world',
  careerFar: 'career-far',
  careerBarFill: 'career-bar-fill',
  careerTick: 'career-tick',
  careerSkip: 'career-skip',
} as const;

// The attribute that carries a motion target's name.
export const MOTION_TARGET_ATTRIBUTE: string = 'data-motion-target';

// The career run's distance: how far the page scrolls through it, a CSS length that RunTrack
// puts in the HTML, so the run's CSS can make the section that much taller than its sticky
// screen. RunTrack also writes data-career-run there, which the CSS Modules of the run's parts
// answer to with `:global([data-career-run])` (src/styles/_careerRun.scss).
export const CAREER_RUN_DISTANCE_PROPERTY: string = '--career-run-distance';

// Set on the career section once the motion has placed the city where the scroll is
// (CareerRunMotion); CSS fades the city in then.
export const CAREER_RUN_LIVE_ATTRIBUTE: string = 'data-career-run-live';

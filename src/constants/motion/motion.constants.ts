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
} as const;

// The attribute that carries a motion target's name.
export const MOTION_TARGET_ATTRIBUTE: string = 'data-motion-target';

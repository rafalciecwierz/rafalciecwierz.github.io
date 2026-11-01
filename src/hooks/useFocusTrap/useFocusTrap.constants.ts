// What the trap cycles through. The menu holds only links and buttons; the rest is here so the
// hook stays correct if a form field is ever added.
export const FOCUSABLE_SELECTOR: string = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

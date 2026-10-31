import type { Contact } from '../contact.types';

// Brief 4.9. The phone number is never shown on the site.
export const contact: Contact = {
  heading: { number: '06', kicker: 'Contact', title: 'Climb with me.' },
  channels: {
    email: 'Email',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    calendly: 'Book a 20-min call',
  },
  urlTodo: 'Rafał to provide URL',
  downloadCv: 'Download CV',
  writeEmail: 'Write an email',
  copy: 'Copy',
  copyLabel: 'Copy email address',
  copied: 'Copied',
  copiedStatus: 'Email address copied',
  selected: 'Selected: press Ctrl+C or ⌘C',
};

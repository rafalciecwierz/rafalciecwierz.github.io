// A big number with its caption, e.g. "22+" and "years of parkour, and climbing too".
export type Stat = {
  value: string;
  label: string;
};

export type SectionHeading = {
  kicker: string;
  title: string;
};

// The sections in the navigation carry a number ("01").
export type NumberedSectionHeading = SectionHeading & {
  number: string;
};

// A field that is still missing: what it is called and what Rafał has to provide.
export type TodoField = {
  label: string;
  todo: string;
};

// A part of a sentence that is a link. The field ends in "Url", so the content test checks it.
export type LinkedText = {
  text: string;
  linkUrl: string;
};

// Copy that may hold links: plain text, or the sentence cut into parts, some of them linked.
export type RichText = string | readonly (string | LinkedText)[];

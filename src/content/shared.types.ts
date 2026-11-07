export type Stat = {
  value: string;
  label: string;
};

export type SectionHeading = {
  kicker: string;
  title: string;
};

export type NumberedSectionHeading = SectionHeading & {
  number: string;
};

export type TodoField = {
  label: string;
  todo: string;
};

export type LinkedText = {
  text: string;
  linkUrl: string;
};

export type RichText = string | readonly (string | LinkedText)[];

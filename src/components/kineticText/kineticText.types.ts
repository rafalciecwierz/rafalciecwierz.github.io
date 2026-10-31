export type KineticLetter = {
  key: string;
  character: string;
};

export type KineticWord = {
  key: string;
  letters: readonly KineticLetter[];
};

export type KineticTextProps = {
  text: string;
};

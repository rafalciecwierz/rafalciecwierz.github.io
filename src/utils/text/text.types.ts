export type TextLetter = {
  key: string;
  character: string;
};

export type TextWord = {
  key: string;
  letters: readonly TextLetter[];
};

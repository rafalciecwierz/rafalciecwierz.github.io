// A mark on the run's progress bar: where a stage starts (0 to 1) and its label (a year, or
// "Next" for the unbuilt roof).
export type RunTick = {
  key: string;
  label: string;
  at: number;
};

export type RunBarProps = {
  ticks: readonly RunTick[];
  // "Skip the run", a link to the section after the career.
  skipLabel: string;
  skipHref: string;
};

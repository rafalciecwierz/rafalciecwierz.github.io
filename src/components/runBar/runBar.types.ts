export type RunTick = {
  key: string;
  label: string;
  at: number;
};

export type RunBarProps = {
  ticks: readonly RunTick[];
  skipLabel: string;
  skipHref: string;
};

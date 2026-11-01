export type BuildingWindow = {
  key: string;
  x: number;
  y: number;
  isLit: boolean;
  isDim: boolean;
};

export type MiniBuildingProps = {
  // 0 to 1: how high the roof is. Newer jobs stand higher.
  height: number;
  // A tower on the roof marks a promotion.
  hasTower: boolean;
};

// The part of the facade covered by the window grid: whole columns and rows.
export type WindowArea = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type SkylineLayer = 'far' | 'near';

export type WindowTone = 'warm' | 'cool';

// The shape of one row of buildings, from the reference design.
export type SkylineLayerSpec = {
  layer: SkylineLayer;
  minHeight: number;
  maxHeight: number;
  // Each building is minWidth + random × widthRange wide.
  minWidth: number;
  widthRange: number;
  // The gap to the next building: minGap + random × gapRange.
  minGap: number;
  gapRange: number;
  // The window grid: one cell every columnStep × rowStep units.
  columnStep: number;
  rowStep: number;
  windowWidth: number;
  windowHeight: number;
  // The share of cells with a lit window.
  litShare: number;
};

export type SkylineRect = {
  key: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type SkylineBuilding = SkylineRect & {
  layer: SkylineLayer;
};

export type SkylineWindow = SkylineRect & {
  layer: SkylineLayer;
  tone: WindowTone;
};

export type SkylineDrawing = {
  // Buildings with their antennas and rooftop boxes, far row first.
  buildings: readonly SkylineBuilding[];
  windows: readonly SkylineWindow[];
};

export type SkylineProps = {
  // The same seed always draws the same city.
  seed: string;
  className?: string | undefined;
};

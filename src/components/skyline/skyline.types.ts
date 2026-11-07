export type SkylineLayer = 'far' | 'near';

export type WindowTone = 'warm' | 'cool';

export type SkylineLayerSpec = {
  layer: SkylineLayer;
  minHeight: number;
  maxHeight: number;
  minWidth: number;
  widthRange: number;
  minGap: number;
  gapRange: number;
  columnStep: number;
  rowStep: number;
  windowWidth: number;
  windowHeight: number;
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
  buildings: readonly SkylineBuilding[];
  windows: readonly SkylineWindow[];
};

export type SkylineProps = {
  seed: string;
  className?: string | undefined;
};

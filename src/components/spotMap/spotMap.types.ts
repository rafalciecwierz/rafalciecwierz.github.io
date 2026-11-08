export type MapPoint = readonly [x: number, y: number];

export type Street = {
  key: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  isAvenue: boolean;
};

export type SpotMapProps = {
  pins: readonly MapPoint[];
  hotIndex: number | null;
  zoomIndex?: number | undefined;
  onPinHover?: ((index: number | null) => void) | undefined;
  onPinClick?: ((index: number) => void) | undefined;
};

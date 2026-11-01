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
  // Where each project's pin stands, in list order.
  pins: readonly MapPoint[];
  // The pin to highlight (the card under the pointer or focus), or null.
  hotIndex: number | null;
  // Zoom on one pin, for the detail panel; the whole map when left out.
  zoomIndex?: number | undefined;
  onPinHover?: ((index: number | null) => void) | undefined;
  // Opens the project's details. Pins are a pointer shortcut: the SVG is hidden from screen
  // readers, and the keyboard path is the button on each card.
  onPinClick?: ((index: number) => void) | undefined;
};

// The career run's world, from the reference design (design/iterations/08-ascent-dark-v2.html,
// RooftopRun). World units: x grows to the right, and a height is measured up from the street,
// so a roof `height` units high is drawn at y = -height.

// Every role is one roof, and every roof is higher than the last: the first at 170, then 85
// higher for each role after it. The next, unbuilt roof is one step above the last role.
export const LEVELS = { first: 170, step: 85 } as const;

// One building per company, 140 units apart. A job with one role is a 380-unit building; a
// promoted job is a 280-unit base with a 165-unit tower for each promotion on its right end.
export const BUILDING = { gap: 140, width: 380, promotedBase: 280 } as const;
export const TOWER_WIDTH: number = 165;
export const NEXT_ROOF_WIDTH: number = 300;

// The run takes 0.42 of a screen of scroll per piece of the line (12 pieces: about five
// screens), so every move gets the same room however long the career grows.
export const SCREENS_PER_SEGMENT: number = 0.42;
export const VH_PER_SCREEN: number = 100;

// The runner's line: he starts 40 units in from the first roof's edge, takes off 20 units
// before a roof ends, and lands 40 units into a new building (30 into a tower, which is
// narrower). A jump counts 1.35 × its straight length, so the scroll lingers in the air; the
// wait on the last roof counts 260.
// The card changes half-way through a jump, so the scene's progress bar and the motion's
// runner agree on where each stage starts.
export const STAGE_SWITCH: number = 0.5;

// Half of a width, to centre a label on a tower or a roof.
export const HALF: number = 0.5;

export const LINE = {
  startInset: 40,
  edgeInset: 20,
  buildingLanding: 40,
  towerLanding: 30,
  jumpStretch: 1.35,
  holdLength: 260,
} as const;

// The world's edges: the street reaches 400 units past both ends of the line and 400 below
// it; above, the crane on the next roof rises 220 units, with 40 to spare.
export const WORLD_MARGIN = { side: 400, below: 400, above: 40 } as const;

// The street lamps, one every 260 units: a post 150 high with a cobra head and a glow.
export const LAMP = {
  spacing: 260,
  height: 150,
  reach: 30,
  curve: 10,
  glowRadius: 90,
  tipDrop: 8,
  headWidth: 26,
  headHeight: 6,
  headInset: 10,
  headDrop: 12,
  postWidth: 5,
  glowOpacity: 0.55,
} as const;

// A facade: the ledge on top, the windows on a 36 × 44 grid from 104 units below the roof down
// to 20 above the street, and 20% of them lit (three in four of those warm, the rest cool).
export const LEDGE = { overhang: 6, rise: 10, height: 12, glow: 2 } as const;
export const WINDOW = {
  width: 16,
  height: 24,
  stepX: 36,
  stepY: 44,
  insetLeft: 22,
  insetRight: 24,
  dropTop: 104,
  bottomGap: 20,
} as const;
export const LIT_SHARE: number = 0.2;
export const WARM_SHARE: number = 0.75;

// The top roof of a building has a box and an antenna on it.
export const ROOF_BOX = { at: 0.62, width: 44, height: 24 } as const;
export const ANTENNA = { inset: 30, height: 60, width: 4 } as const;

// The company's sign and dates on a dark plate above the first row of windows.
export const PLATE = { inset: 10, drop: 12, height: 74 } as const;
export const SIGN = { x: 22, y: 50, size: 44, spacing: 1 } as const;
export const DATES = { x: 24, y: 70, size: 15, spacing: 2 } as const;
// "Promoted" on each tower, 40 units below its roof.
export const TOWER_LABEL = { drop: 40, size: 20, spacing: 2 } as const;

// The roof that is not built yet: a dashed outline in scaffolding every 60 units and "Next"
// painted 70 units below its top.
export const NEXT_ROOF = {
  scaffoldStep: 60,
  labelDrop: 70,
  labelSize: 54,
  dash: '10 8',
} as const;

// The tower crane that builds it. Its lattice mast, 14 units wide, stands on the street 40
// units in from the roof's right edge. Its peak is 240 units above the roof. The jib reaches
// 180 units past the roof's left edge, over the gap the runner waits at. The counter-jib holds
// a counterweight 100 units to the right. The truss is 16 units deep, braced every 20. The
// trolley, 120 units left of the roof, lowers a beam on an 80-unit rope.
export const CRANE = {
  inset: 40,
  mastHalf: 7,
  rise: 240,
  peak: 44,
  depth: 16,
  reach: 180,
  counterReach: 100,
  bay: 20,
  cab: { width: 20, height: 18 },
  weight: { width: 30, height: 28 },
  trolley: { at: 120, width: 14, height: 6 },
  block: { width: 10, height: 12 },
  rope: 80,
  sling: 18,
  load: { width: 64, height: 8 },
} as const;

// The city far behind, drawn smaller and moved slower than the line (parallax): buildings
// 80–220 units wide and 320–840 high, each with up to six faint windows.
export const FAR_SEED: string = 'the line';
export const FAR = {
  startX: -600,
  endX: 3200,
  minWidth: 80,
  widthRange: 140,
  minHeight: 320,
  heightRange: 520,
  gapRange: 10,
  depth: 400,
  windows: 6,
  windowShare: 0.6,
  windowInset: 10,
  windowTop: 20,
  windowBottom: 20,
} as const;
export const FAR_WINDOW = { width: 5, height: 8 } as const;

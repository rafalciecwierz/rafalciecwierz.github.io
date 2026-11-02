import type { ReactNode } from 'react';

import type { Job } from '@/content';

// A block of the run's world: where it starts, how wide it is and how high its roof stands
// above the street.
export type Facade = {
  x: number;
  width: number;
  height: number;
};

// One company's building, oldest first: its base, then a tower for each promotion.
export type RunBuilding = Facade & {
  key: string;
  // The base alone, without the towers.
  baseWidth: number;
  towers: readonly Facade[];
};

// A roof the runner crosses: one per role, so a stage of the run.
export type RunRoof = {
  left: number;
  right: number;
  height: number;
  isTower: boolean;
};

// The line he runs, piece by piece. `stage` is the roof (the role) the piece belongs to; a jump
// belongs to the roof he lands on, and the wait at the end to the next, unbuilt roof. `length`
// is how much scroll the piece takes, in world units.
export type RunSegment =
  | {
      kind: 'run';
      fromX: number;
      toX: number;
      height: number;
      stage: number;
      length: number;
    }
  | {
      kind: 'jump';
      fromX: number;
      fromHeight: number;
      toX: number;
      toHeight: number;
      stage: number;
      length: number;
    }
  | { kind: 'hold'; x: number; height: number; stage: number; length: number };

// The world's area in its own units, for the SVG's viewBox and size.
export type WorldBox = {
  minX: number;
  minY: number;
  width: number;
  height: number;
};

// Everything the run is made of, worked out from how many roles each job had.
export type CareerRunLayout = {
  buildings: readonly RunBuilding[];
  next: Facade;
  roofs: readonly RunRoof[];
  line: readonly RunSegment[];
  // The whole line's length, the sum of its pieces.
  length: number;
  // Where each stage starts, as a share (0 to 1) of the line: one per roof, then the next roof.
  stageStarts: readonly number[];
  box: WorldBox;
};

// A window of a facade, at its place in the world.
export type RunWindow = {
  key: string;
  x: number;
  y: number;
  isWarm: boolean;
};

// The windows of a facade: the area the unlit pattern fills, and the lit ones on top of it.
export type FacadeWindows = {
  area: { x: number; y: number; width: number; height: number };
  lit: readonly RunWindow[];
};

export type FarBuilding = {
  key: string;
  x: number;
  y: number;
  width: number;
  height: number;
  windows: readonly RunWindow[];
};

export type CareerRunSceneProps = {
  // Newest first, as the content lists them; the run builds them oldest first.
  jobs: readonly Job[];
  // "Promoted", painted on each tower.
  promotedLabel: string;
  // "Next", painted on the unbuilt roof.
  nextSign: string;
  // The motion layer, placed inside the scene so its runner is drawn over the buildings.
  children?: ReactNode;
};

export type RunBuildingProps = {
  building: RunBuilding;
  job: Job;
  promotedLabel: string;
  // The world's street level is 0; the facades reach down to the world's bottom edge.
  bottom: number;
};

export type RunFacadeProps = {
  facade: Facade;
  // The top roof of a building gets a box and an antenna.
  isTop: boolean;
  bottom: number;
  // Seeds the lit windows and names the pattern, so each facade differs.
  seed: string;
};

export type CraneBox = { x: number; y: number; width: number; height: number };

// The tower crane over the next roof, as SVG path data and boxes: the frame (mast rails, jib
// and counter-jib chords, the peak), its lattice, the ties from the peak, the hoist rope with
// its slings, and the cab, counterweight, trolley, hook block and the beam it lifts.
export type Crane = {
  frame: string;
  lattice: string;
  ties: string;
  rope: string;
  cab: CraneBox;
  weight: CraneBox;
  trolley: CraneBox;
  block: CraneBox;
  load: CraneBox;
};

export type RunNextRoofProps = {
  roof: Facade;
  sign: string;
};

export type RunTrackProps = {
  // Newest first, as the content lists them.
  jobs: readonly Job[];
  children: ReactNode;
};

export type RunStreetProps = {
  box: WorldBox;
};

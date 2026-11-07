import type { ReactNode } from 'react';

import type { Job } from '@/content';

export type Facade = {
  x: number;
  width: number;
  height: number;
};

export type RunBuilding = Facade & {
  key: string;
  baseWidth: number;
  towers: readonly Facade[];
};

export type RunRoof = {
  left: number;
  right: number;
  height: number;
  isTower: boolean;
};

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

export type WorldBox = {
  minX: number;
  minY: number;
  width: number;
  height: number;
};

export type CareerRunLayout = {
  buildings: readonly RunBuilding[];
  next: Facade;
  roofs: readonly RunRoof[];
  line: readonly RunSegment[];
  length: number;
  stageStarts: readonly number[];
  box: WorldBox;
};

export type RunWindow = {
  key: string;
  x: number;
  y: number;
  isWarm: boolean;
};

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
  jobs: readonly Job[];
  promotedLabel: string;
  nextSign: string;
  children?: ReactNode;
};

export type RunBuildingProps = {
  building: RunBuilding;
  job: Job;
  promotedLabel: string;
  bottom: number;
};

export type RunFacadeProps = {
  facade: Facade;
  isTop: boolean;
  bottom: number;
  seed: string;
};

export type CraneBox = { x: number; y: number; width: number; height: number };

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
  jobs: readonly Job[];
  children: ReactNode;
};

export type RunStreetProps = {
  box: WorldBox;
};

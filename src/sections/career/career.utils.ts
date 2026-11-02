import {
  type CareerRunLayout,
  careerRunLayout,
  type RunTick,
} from '@/components';
import type { Job } from '@/content';

import { BUILDING_HEIGHTS } from './career.constants';

// The names of the moves each job covers, in the list's order (newest first). The run counts
// moves from the first job: one move per role, so a promotion is two moves at one company.
export function jobMoveNames(
  jobs: readonly Job[],
  moveNames: readonly string[],
): string[][] {
  let move: number = 0;
  const oldestFirst: string[][] = [...jobs]
    .reverse()
    .map((job: Job): string[] => {
      const names: string[] = moveNames.slice(move, move + job.roles.length);
      move += job.roles.length;
      return names;
    });
  return oldestFirst.reverse();
}

// The last move name is the next, unbuilt roof.
export function nextMoveName(moveNames: readonly string[]): string {
  return moveNames.at(-1) ?? '';
}

// The height of the building beside the job at this position (newest first).
export function buildingHeight(index: number): number {
  return BUILDING_HEIGHTS[index] ?? BUILDING_HEIGHTS.at(-1) ?? 0;
}

// The ticks on the career run's progress bar: the year each job started, where its first roof
// starts, and the next roof's sign at the end. A promotion's roof gets no tick of its own.
export function runTicks(jobs: readonly Job[], nextSign: string): RunTick[] {
  const oldestFirst: Job[] = [...jobs].reverse();
  const layout: CareerRunLayout = careerRunLayout(
    oldestFirst.map((job: Job): number => job.roles.length),
  );
  const ticks: RunTick[] = [];
  let stage: number = 0;
  for (const job of oldestFirst) {
    ticks.push({
      key: job.id,
      label: String(job.period.start.year),
      at: layout.stageStarts[stage] ?? 0,
    });
    stage += job.roles.length;
  }
  ticks.push({
    key: 'next',
    label: nextSign,
    at: layout.stageStarts[stage] ?? 1,
  });
  return ticks;
}

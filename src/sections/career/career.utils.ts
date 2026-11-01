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

import { describe, expect, it } from 'vitest';

import type { Job } from '@/content';

import { buildingHeight, jobMoveNames, nextMoveName } from './career.utils';

function job(id: string, roles: [string, ...string[]]): Job {
  return {
    id,
    company: id,
    sign: id,
    roles,
    period: { start: { year: 2020, month: 1 }, end: { year: 2021, month: 1 } },
    points: [],
    stack: [],
  };
}

const MOVES: readonly string[] = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'Next'];

// Newest first, as the content lists them: two promotions in the two oldest jobs.
const JOBS: readonly Job[] = [
  job('newest', ['Engineer']),
  job('third', ['Engineer']),
  job('second', ['Developer', 'Team Leader']),
  job('first', ['QA', 'Developer']),
];

describe('jobMoveNames', (): void => {
  it('counts the moves from the first job, one per role', (): void => {
    expect(jobMoveNames(JOBS, MOVES)).toEqual([
      ['M6'],
      ['M5'],
      ['M3', 'M4'],
      ['M1', 'M2'],
    ]);
  });
});

describe('nextMoveName', (): void => {
  it('is the last move', (): void => {
    expect(nextMoveName(MOVES)).toBe('Next');
  });
});

describe('buildingHeight', (): void => {
  it('makes newer jobs stand higher, and keeps the lowest for any extra job', (): void => {
    expect(buildingHeight(0)).toBeGreaterThan(buildingHeight(1));
    expect(buildingHeight(10)).toBe(buildingHeight(3));
  });
});

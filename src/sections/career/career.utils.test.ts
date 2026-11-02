import { describe, expect, it } from 'vitest';

import type { RunTick } from '@/components';
import type { Job } from '@/content';

import {
  buildingHeight,
  jobMoveNames,
  nextMoveName,
  runTicks,
} from './career.utils';

function job(
  id: string,
  roles: [string, ...string[]],
  startYear: number = 2020,
): Job {
  return {
    id,
    company: id,
    sign: id,
    roles,
    period: {
      start: { year: startYear, month: 1 },
      end: { year: startYear + 1, month: 1 },
    },
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

describe('runTicks', (): void => {
  const jobs: readonly Job[] = [
    job('newer', ['Engineer'], 2024),
    job('older', ['QA', 'Developer'], 2021),
  ];

  it('marks the start year of each job, oldest first, and ends with the next roof', (): void => {
    const ticks: RunTick[] = runTicks(jobs, 'Next');

    expect(ticks.map((tick: RunTick): string => tick.label)).toEqual([
      '2021',
      '2024',
      'Next',
    ]);
    expect(ticks[0]?.at).toBe(0);
    expect(ticks[1]?.at).toBeGreaterThan(0);
    expect(ticks[2]?.at).toBeGreaterThan(ticks[1]?.at ?? 1);
    expect(ticks[2]?.at).toBeLessThan(1);
  });
});

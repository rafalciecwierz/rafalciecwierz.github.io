import { describe, expect, it } from 'vitest';

import { tornEdge } from './tornEdge.utils';

describe('tornEdge', (): void => {
  it('cuts the same edge for the same seed and a different one for another', (): void => {
    expect(tornEdge(1)).toBe(tornEdge(1));
    expect(tornEdge(1)).not.toBe(tornEdge(2));
  });

  it('is a polygon running along the top, then back along the bottom', (): void => {
    const path: string = tornEdge(7);

    expect(path.startsWith('polygon(0% ')).toBe(true);
    expect(path).toContain('100% calc(100% - ');
    expect(path.endsWith(')')).toBe(true);
  });
});

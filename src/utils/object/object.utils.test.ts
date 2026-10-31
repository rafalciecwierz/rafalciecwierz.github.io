import { describe, expect, it } from 'vitest';

import type { Leaf } from './object.types';
import { collectLeaves } from './object.utils';

describe('collectLeaves', (): void => {
  it('returns every value that is not an object or an array, with its path', (): void => {
    expect(collectLeaves({ a: 'x', b: { c: null, d: 2 } })).toEqual([
      { path: 'a', value: 'x' },
      { path: 'b.c', value: null },
      { path: 'b.d', value: 2 },
    ]);
  });

  it('names an array item by its id, so the path survives reordering', (): void => {
    expect(
      collectLeaves({ items: [{ id: 'first', url: null }, 'plain'] }),
    ).toEqual([
      { path: 'items[first].id', value: 'first' },
      { path: 'items[first].url', value: null },
      { path: 'items[1]', value: 'plain' },
    ]);
  });

  it('keeps functions as leaves', (): void => {
    function count(n: number): string {
      return String(n);
    }
    const leaves: readonly Leaf[] = collectLeaves({ count });

    expect(leaves).toEqual([{ path: 'count', value: count }]);
  });
});

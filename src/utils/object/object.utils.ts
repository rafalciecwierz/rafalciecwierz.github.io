import type { Leaf, PlainObject } from './object.types';

export function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

// An array item is named by its `id` when it has one, so a path stays the same when items move.
function itemSegment(item: unknown, index: number): string {
  if (isPlainObject(item) && typeof item.id === 'string') {
    return `[${item.id}]`;
  }
  return `[${String(index)}]`;
}

function joinPath(parent: string, key: string): string {
  return parent === '' ? key : `${parent}.${key}`;
}

// Walks objects and arrays and returns every other value with its path. Tests use it to check
// the whole content at once: unique ids, valid links and every `null` being a listed TODO.
export function collectLeaves(value: unknown, path: string = ''): Leaf[] {
  if (Array.isArray(value)) {
    return value.flatMap((item: unknown, index: number): Leaf[] =>
      collectLeaves(item, `${path}${itemSegment(item, index)}`),
    );
  }
  if (isPlainObject(value)) {
    return Object.entries(value).flatMap(
      ([key, child]: [string, unknown]): Leaf[] =>
        collectLeaves(child, joinPath(path, key)),
    );
  }
  return [{ path, value }];
}

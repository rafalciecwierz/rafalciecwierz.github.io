// @vitest-environment node
import { globSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import type { RawValue } from './cssModules.types';
import { findRawValues } from './cssModules.utils.ts';

const SOURCE_DIRECTORY: string = fileURLToPath(
  new URL('../src/', import.meta.url),
);
const MODULE_FILES: string[] = globSync('**/*.module.scss', {
  cwd: SOURCE_DIRECTORY,
});

describe('CSS Modules', (): void => {
  it('are found, so the check below has something to read', (): void => {
    expect(MODULE_FILES.length).toBeGreaterThan(0);
  });

  it.each(MODULE_FILES)(
    'src/%s takes colours, fonts, sizes, durations and layers from tokens',
    (file: string): void => {
      const scss: string = readFileSync(`${SOURCE_DIRECTORY}${file}`, 'utf8');
      const rawValues: RawValue[] = findRawValues(scss);

      expect(rawValues).toEqual([]);
    },
  );
});

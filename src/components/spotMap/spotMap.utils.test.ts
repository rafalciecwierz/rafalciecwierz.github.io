import { describe, expect, it } from 'vitest';

import { MIN_PIN_GAP, PIN_AREA } from './spotMap.constants';
import type { MapPoint } from './spotMap.types';
import { mapStreets, pinPositions } from './spotMap.utils';

const NAMES: readonly string[] = [
  'Ashen Contracts',
  'Ultimate Frisbee',
  'This website',
  'Transitions',
];

describe('pinPositions', (): void => {
  it('gives a project the same spot whatever comes after it', (): void => {
    expect(pinPositions(NAMES)).toEqual(pinPositions(NAMES));
    expect(pinPositions(NAMES)[0]).toEqual(
      pinPositions(['Ashen Contracts'])[0],
    );
  });

  it('keeps the pins inside the area and apart from each other', (): void => {
    const pins: MapPoint[] = pinPositions(NAMES);

    pins.forEach((pin: MapPoint, index: number): void => {
      expect(pin[0]).toBeGreaterThanOrEqual(PIN_AREA.x);
      expect(pin[0]).toBeLessThanOrEqual(PIN_AREA.x + PIN_AREA.width);
      pins.slice(index + 1).forEach((other: MapPoint): void => {
        expect(
          Math.hypot(other[0] - pin[0], other[1] - pin[1]),
        ).toBeGreaterThanOrEqual(MIN_PIN_GAP);
      });
    });
  });
});

describe('mapStreets', (): void => {
  it('draws the same streets every time, nine each way', (): void => {
    expect(mapStreets()).toEqual(mapStreets());
    expect(mapStreets()).toHaveLength(18);
  });
});

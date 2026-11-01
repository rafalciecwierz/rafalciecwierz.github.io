import { createRandom, hashString } from '@/utils';

import {
  AVENUE_EVERY,
  MAX_PIN_TRIES,
  MIN_PIN_GAP,
  PIN_AREA,
  STREET,
  STREET_COUNT,
  STREETS_SEED,
  ZOOM_HEIGHT,
  ZOOM_OFFSET_X,
  ZOOM_OFFSET_Y,
  ZOOM_WIDTH,
} from './spotMap.constants';
import type { MapPoint, Street } from './spotMap.types';

const HALF: number = 0.5;

function round(value: number): number {
  return Math.round(value);
}

// The street grid: nine streets each way, each a little crooked, every third a wide avenue.
// Seeded, so the map is the same at build time and in the browser.
export function mapStreets(): Street[] {
  const random: () => number = createRandom(hashString(STREETS_SEED));
  const streets: Street[] = [];
  for (let index: number = 0; index < STREET_COUNT; index += 1) {
    const y: number =
      STREET.horizontalFirst +
      index * STREET.horizontalStep +
      random() * STREET.jitter;
    const y2: number = y + (random() - HALF) * STREET.skew;
    streets.push({
      key: `h${String(index)}`,
      x1: STREET.start,
      y1: round(y),
      x2: STREET.end,
      y2: round(y2),
      isAvenue: index % AVENUE_EVERY === 0,
    });
  }
  for (let index: number = 0; index < STREET_COUNT; index += 1) {
    const x: number =
      STREET.verticalFirst +
      index * STREET.verticalStep +
      random() * STREET.jitter;
    const x2: number = x + (random() - HALF) * STREET.skew;
    streets.push({
      key: `v${String(index)}`,
      x1: round(x),
      y1: STREET.start,
      x2: round(x2),
      y2: STREET.end,
      isAvenue: index % AVENUE_EVERY === 0,
    });
  }
  return streets;
}

function isTooClose(point: MapPoint, others: readonly MapPoint[]): boolean {
  return others.some(
    (other: MapPoint): boolean =>
      Math.hypot(other[0] - point[0], other[1] - point[1]) < MIN_PIN_GAP,
  );
}

// One pin per project, placed by a generator seeded with the project's name: a project keeps
// its spot when others are added, removed or reordered. Pins keep apart from each other.
export function pinPositions(names: readonly string[]): MapPoint[] {
  const pins: MapPoint[] = [];
  names.forEach((name: string): void => {
    const random: () => number = createRandom(hashString(name));
    let point: MapPoint = [0, 0];
    let tries: number = 0;
    do {
      point = [
        round(PIN_AREA.x + random() * PIN_AREA.width),
        round(PIN_AREA.y + random() * PIN_AREA.height),
      ];
      tries += 1;
    } while (tries < MAX_PIN_TRIES && isTooClose(point, pins));
    pins.push(point);
  });
  return pins;
}

// The viewBox of the panel's zoomed map, centred a little above the pin.
export function zoomViewBox(pin: MapPoint): string {
  return `${String(pin[0] - ZOOM_OFFSET_X)} ${String(pin[1] - ZOOM_OFFSET_Y)} ${String(ZOOM_WIDTH)} ${String(ZOOM_HEIGHT)}`;
}

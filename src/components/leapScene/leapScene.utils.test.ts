import { describe, expect, it } from 'vitest';

import { LANDING_ROOF, TAKE_OFF_ROOF, WINDOW } from './leapScene.constants';
import type { SceneRect } from './leapScene.types';
import { distantBuildings, litWindows, windowArea } from './leapScene.utils';

describe('the leap scene', (): void => {
  it('draws the same distant city every time', (): void => {
    expect(distantBuildings()).toEqual(distantBuildings());
    expect(distantBuildings().length).toBeGreaterThan(5);
  });

  it('lights a few windows, all inside the roof’s window area and on its grid', (): void => {
    const area: SceneRect = windowArea(LANDING_ROOF);
    const lit: SceneRect[] = litWindows(LANDING_ROOF, 'AI');

    expect(lit.length).toBeGreaterThan(0);
    lit.forEach((window: SceneRect): void => {
      expect((window.x - area.x) % WINDOW.stepX).toBe(0);
      expect((window.y - area.y) % WINDOW.stepY).toBe(0);
      expect(window.x + window.width).toBeLessThanOrEqual(area.x + area.width);
    });
  });

  it('lights different windows on the two roofs', (): void => {
    expect(litWindows(TAKE_OFF_ROOF, 'Frontend')).not.toEqual(
      litWindows(TAKE_OFF_ROOF, 'AI'),
    );
  });
});

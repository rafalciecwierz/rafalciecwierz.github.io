import { describe, expect, it } from 'vitest';

import { taglineLines } from './heroIntro.utils';

describe('taglineLines', (): void => {
  it('splits after the middle dot, which stays at the end of the first line', (): void => {
    expect(
      taglineLines('React & TypeScript · 5+ years building production apps'),
    ).toEqual(['React & TypeScript ·', '5+ years building production apps']);
  });

  it('keeps a tagline without a middle dot as one line', (): void => {
    expect(taglineLines('Frontend engineer')).toEqual(['Frontend engineer']);
  });

  it('splits only at the first middle dot', (): void => {
    expect(taglineLines('A · B · C')).toEqual(['A ·', 'B · C']);
  });
});

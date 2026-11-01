import { act, renderHook, type RenderHookResult } from '@testing-library/react';
import type { ReactElement } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { setMediaMatches } from '@/test/matchMedia';

import { useReducedMotion } from './useReducedMotion.hook';

function ReducedMotionProbe(): ReactElement {
  const isReducedMotion: boolean = useReducedMotion();
  return <>{String(isReducedMotion)}</>;
}

describe('useReducedMotion', (): void => {
  it('answers "reduce" on the server, so the pre-rendered page is the static one', (): void => {
    expect(renderToString(<ReducedMotionProbe />)).toBe('true');
  });

  it('follows the system setting in the browser, also when it changes', (): void => {
    const { result }: RenderHookResult<boolean, unknown> =
      renderHook(useReducedMotion);
    expect(result.current).toBe(false);

    act((): void => {
      setMediaMatches(true);
    });

    expect(result.current).toBe(true);
  });
});

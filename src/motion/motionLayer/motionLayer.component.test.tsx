import { act, render, waitFor } from '@testing-library/react';
import { useEffect } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, type Mock, vi } from 'vitest';

import { setMediaMatches } from '@/test/matchMedia';

import { MotionLayer } from './motionLayer.component';
import type { MotionLoader, MotionModule } from './motionLayer.types';

// A stand-in motion component that records when it mounts and unmounts, and the loader that
// "downloads" it.
function createFakeMotion(): {
  load: Mock<MotionLoader>;
  onMount: Mock<() => void>;
  onUnmount: Mock<() => void>;
} {
  const onMount: Mock<() => void> = vi.fn<() => void>();
  const onUnmount: Mock<() => void> = vi.fn<() => void>();
  function FakeMotion(): null {
    useEffect((): (() => void) => {
      onMount();
      return onUnmount;
    }, []);
    return null;
  }
  const load: Mock<MotionLoader> = vi.fn<MotionLoader>(
    (): Promise<MotionModule> => Promise.resolve({ default: FakeMotion }),
  );
  return { load, onMount, onUnmount };
}

describe('MotionLayer', (): void => {
  it('renders nothing on the server and does not load its motion component', (): void => {
    const { load } = createFakeMotion();

    expect(renderToString(<MotionLayer load={load} />)).toBe('');
    expect(load).not.toHaveBeenCalled();
  });

  it('loads and mounts its motion component once the browser is idle', async (): Promise<void> => {
    const { load, onMount } = createFakeMotion();

    render(<MotionLayer load={load} />);

    await waitFor((): void => {
      expect(onMount).toHaveBeenCalledOnce();
    });
  });

  it('never loads its motion component with reduced motion', async (): Promise<void> => {
    setMediaMatches(true);
    const { load, onMount } = createFakeMotion();

    render(<MotionLayer load={load} />);
    // Longer than the idle fallback, so the layer has had its chance to load.
    await new Promise<void>((resolve: () => void): void => {
      setTimeout(resolve, 400);
    });

    expect(load).not.toHaveBeenCalled();
    expect(onMount).not.toHaveBeenCalled();
  });

  it('unmounts its motion component when reduced motion is turned on', async (): Promise<void> => {
    const { load, onMount, onUnmount } = createFakeMotion();
    render(<MotionLayer load={load} />);
    await waitFor((): void => {
      expect(onMount).toHaveBeenCalledOnce();
    });

    act((): void => {
      setMediaMatches(true);
    });

    expect(onUnmount).toHaveBeenCalledOnce();
  });
});

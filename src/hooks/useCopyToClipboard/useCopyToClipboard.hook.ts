import {
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { type CopyResult, copyText } from '@/services';

import { COPY_RESET_DELAY } from './useCopyToClipboard.constants';
import type { CopyToClipboard } from './useCopyToClipboard.types';

export function useCopyToClipboard(): CopyToClipboard {
  const [result, setResult] = useState<CopyResult | null>(null);
  const timer: RefObject<number | undefined> = useRef<number | undefined>(
    undefined,
  );

  const copy: (text: string, fallbackElement: HTMLElement | null) => void =
    useCallback((text: string, fallbackElement: HTMLElement | null): void => {
      window.clearTimeout(timer.current);
      void copyText(text, fallbackElement).then((outcome: CopyResult): void => {
        setResult(outcome);
        timer.current = window.setTimeout((): void => {
          setResult(null);
        }, COPY_RESET_DELAY);
      });
    }, []);

  // A pending reset must not run after the component is gone.
  useEffect(
    (): (() => void) => (): void => {
      window.clearTimeout(timer.current);
    },
    [],
  );

  return { result, copy };
}

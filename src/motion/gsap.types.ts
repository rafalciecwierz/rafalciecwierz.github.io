export type ContextSafe = <Callback extends (...args: never[]) => unknown>(
  callback: Callback,
) => Callback;

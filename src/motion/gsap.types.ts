// useGSAP's contextSafe(): wraps a function that creates animations later (in a ScrollTrigger
// callback or a click handler), so they still belong to the component's GSAP context and are
// reverted when it unmounts. @gsap/react does not export this type, so it is written here.
export type ContextSafe = <Callback extends (...args: never[]) => unknown>(
  callback: Callback,
) => Callback;

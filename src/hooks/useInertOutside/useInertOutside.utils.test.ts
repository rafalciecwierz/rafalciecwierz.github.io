import { describe, expect, it } from 'vitest';

import { elementsOutside } from './useInertOutside.utils';

// <body><header><a/><nav/></header><main/><footer/><script/></body>
function page(): {
  body: HTMLElement;
  brand: HTMLElement;
  nav: HTMLElement;
  main: HTMLElement;
  footer: HTMLElement;
} {
  const body: HTMLElement = document.createElement('body');
  const header: HTMLElement = document.createElement('header');
  const brand: HTMLElement = document.createElement('a');
  const nav: HTMLElement = document.createElement('nav');
  const main: HTMLElement = document.createElement('main');
  const footer: HTMLElement = document.createElement('footer');
  header.append(brand, nav);
  body.append(header, main, footer, document.createElement('script'));
  return { body, brand, nav, main, footer };
}

describe('elementsOutside', (): void => {
  it('lists every element beside the container and beside each of its ancestors', (): void => {
    const { body, brand, nav, main, footer } = page();

    expect(elementsOutside(nav, body)).toEqual([brand, main, footer]);
  });

  it('leaves out scripts and the container itself', (): void => {
    const { body, nav } = page();
    const outside: HTMLElement[] = elementsOutside(nav, body);

    expect(outside).not.toContain(nav);
    expect(
      outside.some(
        (element: HTMLElement): boolean => element.tagName === 'SCRIPT',
      ),
    ).toBe(false);
  });
});

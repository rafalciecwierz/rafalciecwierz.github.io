// jsdom has no window.matchMedia. This stand-in answers every query with one value that a test
// can change; a change notifies every list, as a window resize would.
let isMatching: boolean = false;
const lists: Set<MockMediaQueryList> = new Set<MockMediaQueryList>();

class MockMediaQueryList extends EventTarget {
  readonly media: string;
  onchange: null = null;

  constructor(media: string) {
    super();
    this.media = media;
  }

  get matches(): boolean {
    return isMatching;
  }

  // The deprecated listener API, which nothing in the project uses.
  addListener(): void {
    // Not used.
  }

  removeListener(): void {
    // Not used.
  }
}

export function installMatchMedia(): void {
  // Tests in scripts/ run in Node, which has no window.
  if (!('window' in globalThis)) {
    return;
  }
  window.matchMedia = (query: string): MediaQueryList => {
    const list: MockMediaQueryList = new MockMediaQueryList(query);
    lists.add(list);
    return list;
  };
}

export function setMediaMatches(isMatch: boolean): void {
  isMatching = isMatch;
  lists.forEach((list: MockMediaQueryList): void => {
    list.dispatchEvent(new Event('change'));
  });
}

export function resetMatchMedia(): void {
  isMatching = false;
  lists.clear();
}

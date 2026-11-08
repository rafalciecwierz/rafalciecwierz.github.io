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

  addListener(): void {
    // Not used.
  }

  removeListener(): void {
    // Not used.
  }
}

export function installMatchMedia(): void {
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

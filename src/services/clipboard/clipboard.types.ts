// copied: the text is on the clipboard. selected: the browser refused (an old browser or a
// blocked permission), so the text is selected on the page for the reader to copy.
export type CopyResult = 'copied' | 'selected';

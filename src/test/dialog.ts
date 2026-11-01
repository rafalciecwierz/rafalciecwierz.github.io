// jsdom has no showModal() or close() on <dialog>. This stand-in opens and closes it and fires
// the close event, which is all the Dialog component relies on.
function showModal(this: HTMLDialogElement): void {
  this.setAttribute('open', '');
}

function close(this: HTMLDialogElement): void {
  this.removeAttribute('open');
  this.dispatchEvent(new Event('close'));
}

export function installDialog(): void {
  // Tests in scripts/ run in Node, which has no DOM.
  if (!('HTMLDialogElement' in globalThis)) {
    return;
  }
  HTMLDialogElement.prototype.showModal = showModal;
  HTMLDialogElement.prototype.close = close;
}

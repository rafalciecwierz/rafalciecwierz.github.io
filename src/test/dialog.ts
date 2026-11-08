function showModal(this: HTMLDialogElement): void {
  this.setAttribute('open', '');
}

function close(this: HTMLDialogElement): void {
  this.removeAttribute('open');
  this.dispatchEvent(new Event('close'));
}

export function installDialog(): void {
  if (!('HTMLDialogElement' in globalThis)) {
    return;
  }
  HTMLDialogElement.prototype.showModal = showModal;
  HTMLDialogElement.prototype.close = close;
}

import { toTypeString } from '@/common/base';

export function domReady(condition: DocumentReadyState[] = ['complete', 'interactive']) {
  return new Promise((resolve) => {
    if (condition.includes(document.readyState)) {
      resolve(true);
    } else {
      document.addEventListener('readystatechange', () => {
        if (condition.includes(document.readyState)) {
          resolve(true);
        }
      });
    }
  });
}

export interface IDomNodePagePosition {
  left: number;
  top: number;
  width: number;
  height: number;
}

/**
 * Returns the position of a dom node relative to the entire page.
 */
export function getDomNodePagePosition(domNode: HTMLElement): IDomNodePagePosition {
  const bb = domNode.getBoundingClientRect();
  return {
    left: bb.left + (domNode.ownerDocument.defaultView?.scrollX ?? 0),
    top: bb.top + (domNode.ownerDocument.defaultView?.scrollY ?? 0),
    width: bb.width,
    height: bb.height,
  };
}

export function getWindow(element: Node): Window;
export function getWindow(event: UIEvent): Window;
export function getWindow(obj: unknown): Window;
export function getWindow(e: unknown): Window {
  const candidateNode = e as Node | undefined;
  if (candidateNode?.ownerDocument?.defaultView) {
    return candidateNode.ownerDocument.defaultView.window;
  }

  const candidateEvent = e as UIEvent | undefined;
  if (candidateEvent?.view) {
    return candidateEvent.view.window;
  }

  return window;
}

export function getActiveElement() {
  let activeElement = document.activeElement;
  while (activeElement?.shadowRoot) {
    activeElement = activeElement.shadowRoot.activeElement;
  }
  return activeElement;
}

export function isActiveElement(element: Element): boolean {
  return getActiveElement() === element;
}

export function isElement(node: any): node is Element {
  if (typeof Element === 'undefined') return false;
  return node instanceof Element;
}

export function isHTMLElement(node: any): node is HTMLElement {
  if (typeof HTMLElement !== 'undefined') {
    return node instanceof HTMLElement;
  }
  return node && typeof node === 'object' && node.nodeType === 1 && typeof node.nodeName === 'string';
}

export function isWindow(win: any): boolean {
  return typeof window !== 'undefined' && toTypeString(win) === '[object Window]';
}

export function isDocument(node: Node): node is Document {
  return node && node.nodeName === '#document';
}

export function isShadowRoot(node: Node): node is ShadowRoot {
  return node && Boolean((<ShadowRoot>node).host) && Boolean((<ShadowRoot>node).mode);
}

import type { AnyFn } from './typingUtils';
import type { IDisposable } from './lifecycle';

export function once<K extends keyof WindowEventMap>(el: Window, type: K, fn: AnyFn): void;
export function once<K extends keyof DocumentEventMap>(el: Document, type: K, fn: AnyFn): void;
export function once<K extends keyof HTMLElementEventMap>(el: HTMLElement, type: K, fn: AnyFn): void;
export function once(el: HTMLElement, type: string, fn: AnyFn): void;
export function once(el: HTMLElement | Window | Document, type: string, fn: AnyFn): void {
  let listener = function (this: typeof el) {
    if (fn) {
      // eslint-disable-next-line prefer-rest-params
      fn.apply<typeof el, any, void>(this, arguments);
    }
    el.removeEventListener(type, listener);
  };
  el.addEventListener(type, listener);
}

// port from https://github.com/ai/nanoevents

type EventsMap = Record<string, any>;

interface DefaultEvents extends EventsMap {
  [event: string]: (...args: any) => void;
}

export interface Unsubscribe {
  (): void;
}

export declare class Emitter<Events extends EventsMap = DefaultEvents> {
  /**
   * Event names in keys and arrays with listeners in values.
   *
   * ```js
   * emitter1.events = emitter2.events
   * emitter2.events = { }
   * ```
   */
  events: Partial<{ [E in keyof Events]: Events[E][] }>;

  /**
   * Add a listener for a given event.
   *
   * ```js
   * const unbind = ee.on('tick', (tickType, tickDuration) => {
   *   count += 1
   * })
   *
   * disable () {
   *   unbind()
   * }
   * ```
   *
   * @param event The event name.
   * @param cb The listener function.
   * @returns Unbind listener from event.
   */
  on<K extends keyof Events>(this: this, event: K, cb: Events[K]): Unsubscribe;

  /**
   * Calls each of the listeners registered for a given event.
   *
   * ```js
   * ee.emit('tick', tickType, tickDuration)
   * ```
   *
   * @param event The event name.
   * @param args The arguments for listeners.
   */
  emit<K extends keyof Events>(
    this: this,
    event: K,
    ...args: Parameters<Events[K]>
  ): void;
}

/**
 * Create event emitter.
 *
 * ```js
 * import { createNanoEvents } from 'nanoevents'
 *
 * class Ticker {
 *   constructor() {
 *     this.emitter = createNanoEvents()
 *   }
 *   on(...args) {
 *     return this.emitter.on(...args)
 *   }
 *   tick() {
 *     this.emitter.emit('tick')
 *   }
 * }
 * ```
 */
export function createNanoEvents<Events extends EventsMap = DefaultEvents>(): Emitter<Events> {
  return {
    events: {},
    emit(event, ...args) {
      (this.events[event] || [] as any).forEach((i: any) => i(...args));
    },
    on(event, cb) {
      (this.events[event] = this.events[event] || [] as any).push(cb);
      return () =>
        (this.events[event] = (this.events[event] || [] as any).filter((i: any) => i !== cb));
    },
  };
}



export interface EmitterEvent<T> {
  (listener: (e: T) => any, thisArgs?: any): IDisposable;
}

export class SimpleEmitter<T> {
  private _event?: EmitterEvent<T>;
  private _listeners: ((e: T) => any)[] = [];

  get event(): EmitterEvent<T> {
    this._event ??= (callback: (e: T) => any, thisArgs?: any) => {
      if (thisArgs) {
        callback = callback.bind(thisArgs);
      }

      this._listeners.push(callback);

      return {
        dispose: () => {
          const index = this._listeners.indexOf(callback);
          if (index > -1) this._listeners.splice(index, 1);
        },
      };
    };
    return this._event;
  }

  public dispose(): void {
    if (this._listeners.length > 0) {
      this._listeners.length = 0;
    }
  }

  public fire(event: T): void {
    this._listeners.forEach(l => l?.(event));
  }
}

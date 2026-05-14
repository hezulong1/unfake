import type { IDisposable } from './lifecycle';

export class TimeoutTimer implements IDisposable {
  private _token: number = -1;

  constructor();
  constructor(runner: VoidFunction, timeout: number);
  constructor(runner?: VoidFunction, timeout?: number) {
    if (typeof runner === 'function' && typeof timeout === 'number') {
      this.setIfNotSet(runner, timeout);
    }
  }

  dispose(): void {
    this.cancel();
  }

  cancel(): void {
    if (this._token !== -1) {
      window.clearTimeout(this._token);
      this._token = -1;
    }
  }

  cancelAndSet(runner: VoidFunction, timeout: number): void {
    this.cancel();
    this._token = window.setTimeout(() => {
      this._token = -1;
      runner();
    }, timeout);
  }

  setIfNotSet(runner: VoidFunction, timeout: number): void {
    if (this._token !== -1) {
      // timer is already set
      return;
    }
    this._token = window.setTimeout(() => {
      this._token = -1;
      runner();
    }, timeout);
  }
}

export class IntervalTimer implements IDisposable {
  private _token: number = -1;

  dispose(): void {
    this.cancel();
  }

  cancel(): void {
    if (this._token !== -1) {
      clearInterval(this._token);
      this._token = -1;
    }
  }

  cancelAndSet(runner: VoidFunction, interval: number): void {
    this.cancel();
    this._token = window.setInterval(() => {
      runner();
    }, interval);
  }
}

export function createTimeoutTimer() {
  let token: ReturnType<typeof setTimeout> | null = null;

  const cancel = () => {
    if (token !== null) {
      clearTimeout(token);
      token = null;
    }
  };

  const cancelAndSet = (runner: VoidFunction, timeout: number) => {
    cancel();
    token = setTimeout(() => {
      token = null;
      runner();
    }, timeout);
  };

  return { cancel, cancelAndSet };
}

export function createIntervalTimer() {
  let token: ReturnType<typeof setInterval> | null = null;

  const cancel = () => {
    if (token !== null) {
      clearInterval(token);
      token = null;
    }
  };

  const cancelAndSet = (runner: VoidFunction, interval: number) => {
    cancel();
    token = setInterval(() => {
      runner();
    }, interval);
  };

  return { cancel, cancelAndSet };
}

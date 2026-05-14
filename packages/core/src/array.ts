import type { Arrayable } from './typingUtils';

export function ensureArray<T>(arr?: Arrayable<T> | null): T[] {
  if (!arr && (arr as any) !== 0) return [];
  return Array.isArray(arr) ? arr : [arr as T];
}

export function unique<T>(arr: T[]): T[] {
  return Array.from(new Set<T>(arr));
}

/**
 * Groups the elements of an array based on the key.
 * @param array An array.
 * @param key A key name of the each item in items.
 */
export function groupBy<T>(array: T[], key: keyof T): Record<keyof T, T[]>;
/**
 * Groups the elements of an array based on the key returned by the keySelector function.
 * @param array An array.
 * @param keySelector A callback which will be invoked for each item in items.
 */
export function groupBy<T>(array: T[], keySelector: (item: T, index: number) => string): Partial<Record<string, T[]>>;
export function groupBy<T>(array: T[], keyOrSelector: any) {
  if (typeof keyOrSelector === 'string') {
    const prop = keyOrSelector as keyof T;
    keyOrSelector = (item: T) => item[prop];
  }

  const result: Record<string, T[]> = {};

  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    const key = keyOrSelector(item, i);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
  }

  return result;
}

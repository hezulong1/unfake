export function arrify<T>(target: T | T[]): T[] {
  return Array.isArray(target) ? target : [target];
}

export function unique<T>(arr: T[]): T[] {
  return Array.from(new Set<T>(arr));
}

export function tail<T>(array: ArrayLike<T>, n: number = 0): T | undefined {
  return array[array.length - (1 + n)];
}

export function isNonEmptyArray<T>(obj: T[] | undefined | null): obj is T[];
export function isNonEmptyArray<T>(obj: readonly T[] | undefined | null): obj is readonly T[];
export function isNonEmptyArray<T>(obj: T[] | readonly T[] | undefined | null): obj is T[] | readonly T[] {
  return Array.isArray(obj) && obj.length > 0;
}

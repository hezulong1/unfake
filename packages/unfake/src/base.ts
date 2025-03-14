const _hasOwn = Object.prototype.hasOwnProperty;
export const hasOwn = (val: object, key: string | symbol): key is keyof typeof val => _hasOwn.call(val, key);
export const toTypeString = (val: any) => Object.prototype.toString.call(val);
export const noop = () => { /* nothing */ };

export const isBoolean = (val: unknown): val is boolean => val === true || val === false;
export const isString = (val: unknown): val is string => typeof val === 'string';
export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol';
export const isNumber = (val: unknown): val is number => typeof val === 'number';

/**
 * @returns 判断是否为 `object` 类型，但**不是** `null`，`array`
 */
export const isObject = (val: unknown): val is object => toTypeString(val) === '[object Object]' && val !== null && !Array.isArray(val);
export const isDate = (val: unknown): val is Date => val instanceof Date;
export const isFunction = <T extends (...args: any[]) => unknown>(val: unknown): val is T => typeof val === 'function';
export const isRegExp = (val: unknown): val is RegExp => toTypeString(val) === '[object RegExp]';
export const isUndefined = (val: unknown): val is undefined => val === void 0;
export const isUndefinedOrNull = (val: unknown): val is undefined | null => isUndefined(val) || val === null;
export const isDefined = <T>(val: T | undefined | null): val is T => !isUndefinedOrNull(val);

export function isSafeNumber(val: unknown): val is number {
  return isNumber(val) && val <= Number.MAX_SAFE_INTEGER && val >= Number.MIN_SAFE_INTEGER;
}

export function isNonNanNumber(val: unknown): val is number {
  return isNumber(val) && !Number.isNaN(val);
}

export function isNonEmptyString(val: unknown): val is string {
  return isString(val) && Boolean(val.trim());
}

export function isNonEmptyArray<T>(obj: T[] | undefined | null): obj is T[];
export function isNonEmptyArray<T>(obj: readonly T[] | undefined | null): obj is readonly T[];
export function isNonEmptyArray<T>(obj: T[] | readonly T[] | undefined | null): obj is T[] | readonly T[] {
  return Array.isArray(obj) && obj.length > 0;
}

export function isNonEmptyObject<T extends object>(obj: T | undefined | null): obj is T {
  if (isObject(obj)) {
    for (const key in obj) {
      if (hasOwn(obj, key)) {
        return true;
      }
    }
  }

  return false;
}

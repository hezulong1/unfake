import { hasOwn } from './base';

/**
 * 为了 TS 更好的提示
 */
export function objectKeys<T extends object>(obj: T): Array<keyof T & (string | number | boolean | null | undefined)> {
  return Object.keys(obj) as any;
}

export function objectEntries<T extends object>(obj: T): Array<[keyof T, T[keyof T]]> {
  return Object.entries(obj) as any;
}

/**
 * 检查 `obj` 中是否存在 `key`
 *
 * @param obj 被查询的对象
 * @param key `obj` 中存在的键
 */
export function isKeyof<T extends object>(obj: T, key: keyof any): key is keyof T {
  return key in obj;
}

/**
 * taked from naive-ui/_utils/vue
 * 提取对象的某些属性生成新的对象
 */
export function objectOmit<T, K extends string | number | symbol, R extends Record<string, any>>(
  object: T,
  keys: K[] = [],
  rest?: R,
): Omit<T, K> & (R extends undefined ? object : R) {
  const omitedObject: any = {};
  const originalKeys = Object.getOwnPropertyNames(object);
  originalKeys.forEach((originalKey) => {
    if (!(keys as string[]).includes(originalKey)) {
      omitedObject[originalKey] = object[originalKey as keyof T];
    }
  });
  return Object.assign(omitedObject, rest);
}

/**
 * 将一个 Array-like object 转换成真的 Array
 */
export function objectToArray<T extends object = any>(list: ArrayLike<T>, start = 0) {
  let i = list.length - start;
  const ret = Array.from({ length: i });
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret;
}

/**
 * 合并单个对象
 */
export function objectMerge<T extends object = object, S extends object = T>(to: T, _from: S) {
  for (const key in _from) {
    if (hasOwn(_from, key)) {
      to[key] = _from[key];
    }
  }
  return to;
}

/**
 * 将多个对象合并成一个新对象
 */
export function objectsMerge<T extends object>(arr: T[]) {
  const res = {} as object;
  for (const element of arr) {
    if (element) {
      objectMerge(res, element);
    }
  }
  return res;
}

export interface IDisposable {
  dispose(): void;
}

export type Arrayable<T> = T | T[];

export type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};

export type ElementOf<T> = T extends (infer E)[] ? E : never;

export type Numberish = number | string;

// from @types/lodash-es@4.17.12
export interface Dictionary<T> {
  [index: string]: T;
}

export interface NumericDictionary<T> {
  [index: number]: T;
}

export interface Query {
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
}

/**
 * If missing height or width, {min|max}Height or {min|max}Width rules will be ignored respectively.
 */
export interface QuerySize {
  width?: number;
  height?: number;
}

export type QueryRules = Record<string, Query>;

type ResolvedQuery = Readonly<Required<Query>>;
/**
 * taked from https://github.com/d6u/container-query-toolkit
 *
 * @param rules
 */
export function matchQueries<R extends QueryRules>(rules: R) {
  type Entry = ResolvedQuery & { className: keyof R };
  type ReturnType = Record<keyof R, boolean>;

  const entries: Entry[] = [];

  for (const className of Object.keys(rules)) {
    const rule = rules[className];
    entries.push({
      minWidth: rule.minWidth != null ? rule.minWidth : 0,
      maxWidth: rule.maxWidth != null ? rule.maxWidth : Number.POSITIVE_INFINITY,
      minHeight: rule.minHeight != null ? rule.minHeight : 0,
      maxHeight: rule.maxHeight != null ? rule.maxHeight : Number.POSITIVE_INFINITY,
      className,
    });
  }

  return function ({ width, height }: QuerySize) {
    const classNameMap = {} as ReturnType;

    for (const { className, minWidth, maxWidth, minHeight, maxHeight } of entries) {
      if (height != null && width != null) {
        classNameMap[className] = (
          minWidth <= width && width <= maxWidth
          && minHeight <= height && height <= maxHeight
        );
      } else if (height == null && width != null) {
        classNameMap[className] = minWidth <= width && width <= maxWidth;
      } else if (height != null && width == null) {
        classNameMap[className] = minHeight <= height && height <= maxHeight;
      } else {
        classNameMap[className] = true;
      }
    }

    return classNameMap;
  };
}

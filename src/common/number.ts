export function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

/**
 * @param { number } n 值
 * @param { number } decimals 精度，默认为 0
 */
export function round(n: number, decimals = 0) {
  n = Number(n.toString() + 'e' + decimals.toString());
  return Number(Math.round(n) + 'e-' + decimals);
}

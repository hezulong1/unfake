export function clamp(n: number, start: number, end: number) {
  const [min, max] = start > end ? [end, start] : [start, end];
  return Math.min(max, Math.max(min, n));
}

export function round(input: number | string, decimals = 2) {
  const value = typeof input === 'string' ? Number.parseFloat(input) : input;
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

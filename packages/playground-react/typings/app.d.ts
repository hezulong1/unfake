export {};

declare module 'react' {
  interface CSSProperties {
    [K: `--${ string }`]: any;
  }
}

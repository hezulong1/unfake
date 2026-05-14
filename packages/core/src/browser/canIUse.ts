export const isBrowser = /*@__PURE__*/ typeof window !== 'undefined' && typeof document !== 'undefined';

const _touch = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;

export const enableTouch = /* @__PURE__ */ isBrowser && _touch();
export const enablePointerEvents = /* @__PURE__ */ window.PointerEvent && enableTouch;
export const enablePassive = /* @__PURE__ */ (() => {
  let passive = false;
  try {
    const get = function () {
      passive = true;
    };
    const opts = Object.defineProperty({}, 'passive', { get });
    window.addEventListener('test', () => {}, opts);
  } catch (e) {}
  return passive;
})();

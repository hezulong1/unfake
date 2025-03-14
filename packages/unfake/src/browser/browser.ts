const _userAgent = navigator.userAgent;

// Platform
export const isMacintosh = /* @__PURE__ */ _userAgent.indexOf('Macintosh') >= 0;
export const isWindows = /* @__PURE__ */ _userAgent.indexOf('Windows') >= 0;
export const isLinux = /* @__PURE__ */ _userAgent.indexOf('Linux') >= 0;

// Device
export const isWebKit = /* @__PURE__ */ _userAgent.indexOf('AppleWebKit') >= 0;
export const isFirefox = /* @__PURE__ */ _userAgent.indexOf('Firefox') >= 0;
export const isEdge = /*@__PURE__*/ _userAgent.indexOf('Edg/') >= 0;
export const isChrome = /* @__PURE__ */ _userAgent.indexOf('Chrome') >= 0;
export const isSafari = /* @__PURE__ */ _userAgent.indexOf('Safari') >= 0 && !isChrome;
export const isAndroid = /* @__PURE__ */ _userAgent.indexOf('Android') >= 0;
export const isIOS = /* @__PURE__ */ (isMacintosh || _userAgent.indexOf('iPad') >= 0 || _userAgent.indexOf('iPhone') >= 0) && (navigator.maxTouchPoints > 0);

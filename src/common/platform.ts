import { isString } from './_base';

let _isWindows = false;
let _isMacintosh = false;
let _isLinux = false;
let _isIOS = false;
let _isMobile = false;
let _userAgent: string | undefined;

interface INodeProgress {
  platform: string;
  env: {
    [key: string]: string | undefined;
  };
  versions?: {
    node?: string;
  };
}

declare const process: INodeProgress;

let nodeProcess: INodeProgress | undefined;

if (typeof process !== 'undefined' && isString(process?.versions?.node)) {
  nodeProcess = process;
}

interface IWebNavigator {
  userAgent: string;
  maxTouchPoints?: number;
}

declare const navigator: IWebNavigator;

if (typeof nodeProcess === 'object') {
  _isWindows = (nodeProcess.platform === 'win32');
  _isMacintosh = (nodeProcess.platform === 'darwin');
  _isLinux = (nodeProcess.platform === 'linux');
} else if (typeof navigator === 'object') {
  const _userAgent = navigator.userAgent;
  _isWindows = _userAgent.indexOf('Windows') >= 0;
  _isMacintosh = _userAgent.indexOf('Macintosh') >= 0;
  _isLinux = _userAgent.indexOf('Linux') >= 0;
  _isIOS = (_userAgent.indexOf('Macintosh') >= 0 || _userAgent.indexOf('iPad') >= 0 || _userAgent.indexOf('iPhone') >= 0) && Boolean(navigator.maxTouchPoints && navigator.maxTouchPoints > 0);
  _isLinux = _userAgent.indexOf('Linux') >= 0;
  _isMobile = _userAgent.indexOf('Mobi') >= 0;
} else {
  console.error('Unable to resolve platform.');
}

export const isWindows = /*@__PURE__*/_isWindows;
export const isMacintosh = /*@__PURE__*/_isMacintosh;
export const isLinux = /*@__PURE__*/_isLinux;
export const isIOS = /*@__PURE__*/_isIOS;
export const isMobile = /*@__PURE__*/_isMobile;
export const userAgent = /*@__PURE__*/_userAgent;

export const isWebKit = /* @__PURE__ */ Boolean(userAgent && userAgent.indexOf('AppleWebKit') >= 0);
export const isChrome = /*@__PURE__*/Boolean(userAgent && userAgent.indexOf('Chrome') >= 0);
export const isFirefox = /*@__PURE__*/Boolean(userAgent && userAgent.indexOf('Firefox') >= 0);
export const isSafari = /*@__PURE__*/Boolean(!isChrome && (userAgent && userAgent.indexOf('Safari') >= 0));
export const isEdge = /*@__PURE__*/Boolean(userAgent && userAgent.indexOf('Edg/') >= 0);
export const isAndroid = /*@__PURE__*/Boolean(userAgent && userAgent.indexOf('Android') >= 0);

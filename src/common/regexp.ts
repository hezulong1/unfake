/* eslint-disable */

export const urlRE = /*@__PURE__*/ /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
export const emailRE = /*@__PURE__*/ /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
export const letterRE = /*@__PURE__*/ /^[A-Za-z]+$/;
export const idcardRE = /*@__PURE__*/ /(^\d{15}$)|(^\d{17}(x|X|\d)$)/;
/**
 * [\u4E00-\u9FFF] 网络上
 * [\u4e00-\u9fa5] ant-design
 */
export const chineseRE = /*@__PURE__*/ /[\u4E00-\u9FA5]/;
/**
 * ES2015 版本以后使用 /^\p{Unified_Ideograph}{2}$/u
 */
export const chinese2015RE = /*@__PURE__*/ /^\p{Unified_Ideograph}{2}$/u;
export const mobileRE = /*@__PURE__*/ /^1(3|4|7|5|8)([0-9]{9})/;

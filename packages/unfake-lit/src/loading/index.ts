import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

const duration = '1.6s';

/**
 * reference: https://github.com/TuSimple/naive-ui/blob/main/src/_internal/loading/src/Loading.tsx
 */
export class Loading extends LitElement {
  static override styles = css`
    :host { display: inline-block; width: 1em; height: 1em; }
    svg { vertical-align: top; }
  `;

  /**
   * 缩放大小
   * @default 1
   * @example
   * ```html
   * <element scale="" />
   * ```
   */
  @property({ type: Number }) scale = 1;
  /**
   * 圆弧大小，单位：px
   * @default 100
   * @example
   * ```html
   * <element radius="" />
   * ```
   */
  @property({ type: Number }) radius = 100;
  /**
   * 描述的 svg 线宽，单位：px
   * @default 28
   * @example
   * ```html
   * <element stroke-width="" />
   * ```
   */
  @property({ type: Number, attribute: 'stroke-width' }) strokeWidth = 28;
  /**
   * 描述的 svg 线宽颜色
   * @example
   * ```html
   * <element stroke-color="" />
   * ```
   */
  @property({ attribute: 'stroke-color' }) strokeColor?: string = undefined;

  override render() {
    const { scale, radius, strokeColor, strokeWidth } = this;
    const scaledRadius = radius / scale;
    return html`
      <svg viewBox="0 0 ${2 * scaledRadius} ${2 * scaledRadius}" xmlns="http://www.w3.org/2000/svg" style="color: ${ifDefined(strokeColor)}">
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 ${scaledRadius} ${scaledRadius};270 ${scaledRadius} ${scaledRadius}"
            begin="0s"
            dur=${duration}
            fill="freeze"
            repeatCount="indefinite"
          />
          <circle
            fill="none"
            stroke="currentColor"
            stroke-width=${strokeWidth}
            stroke-linecap="round"
            cx=${scaledRadius}
            cy=${scaledRadius}
            r=${radius - strokeWidth / 2}
            stroke-dasharray=${5.67 * radius}
            stroke-dashoffset=${18.48 * radius}
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 ${scaledRadius} ${scaledRadius};135 ${scaledRadius} ${scaledRadius};450 ${scaledRadius} ${scaledRadius}"
              begin="0s"
              dur=${duration}
              fill="freeze"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-dashoffset"
              values="${5.67 * radius};${1.42 * radius};${5.67 * radius}"
              begin="0s"
              dur=${duration}
              fill="freeze"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </svg>
    `;
  }
}

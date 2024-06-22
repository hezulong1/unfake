import { LitElement, css, html } from 'lit';
import { property, queryAssignedElements, state } from 'lit/decorators.js';

interface AutoResizerState {
  height: number;
  width: number;
  offsetHeight: number;
  offsetWidth: number;
}

export class AutoResizer extends LitElement {
  static override styles = css`:host { display: block; width: fit-content; }`;

  /**
   * 是否禁用
   * @default false
   * @example
   * ```html
   * <!-- 标签上使用 disabled 表示 true，移除 disabled 属性表示 false，行为与 checkbox 一致 -->
   * <element disabled />
   * ```
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  @state() state: AutoResizerState = {
    width: 0,
    height: 0,
    offsetHeight: 0,
    offsetWidth: 0,
  };

  @queryAssignedElements() defaultSlot!: Array<HTMLElement>;

  private currentElement: HTMLElement | null = null;
  private resizeObserver: ResizeObserver | null = null;

  protected _onResize = () => {
    if (!this.currentElement) return;

    const { width, height } = this.currentElement.getBoundingClientRect();
    const { offsetWidth, offsetHeight } = this.currentElement;

    const fixedWidth = Math.floor(width);
    const fixedHeight = Math.floor(height);

    if (
      this.state.width !== fixedWidth
      || this.state.height !== fixedHeight
      || this.state.offsetWidth !== offsetWidth
      || this.state.offsetHeight !== offsetHeight
    ) {
      const detail = { width: fixedWidth, height: fixedHeight, offsetWidth, offsetHeight };

      Object.assign(this.state, detail);

      // defer the callback but not defer to next frame
      Promise.resolve().then(() => {
        const event = new CustomEvent('resize', { detail });
        this.dispatchEvent(event);
      });
    }
  };

  protected destroyObserver = () => {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  };

  protected registerObserver = () => {
    if (this.disabled) {
      this.destroyObserver();
      return;
    }

    const element = this.defaultSlot[0];
    const elementChanged = this.currentElement !== element;

    if (elementChanged) {
      this.destroyObserver();
      this.currentElement = element;
    }

    if (!this.resizeObserver && element) {
      this.resizeObserver = new ResizeObserver(this._onResize);
      this.resizeObserver.observe(element);
    }
  };

  override connectedCallback(): void {
    super.connectedCallback();
    this.registerObserver();
  }

  override updated(): void {
    this.registerObserver();
  }

  override disconnectedCallback(): void {
    this.destroyObserver();
    super.disconnectedCallback();
  }

  override render() {
    return html`
      <slot @slotchange=${this.registerObserver}></slot>
    `;
  }
}

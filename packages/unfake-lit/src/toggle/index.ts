import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import styles from './styles';

export class Toggle extends LitElement {
  static override styles = styles;

  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) loading = false;

  @property({ attribute: 'checked-text' }) checkedText = '';
  @property({ attribute: 'unchecked-text' }) uncheckedText = '';

  @state() protected _focused = false;
  @state() protected _pressed = false;

  override render() {
    return html`
      <button
        tabindex=${this.disabled ? -1 : 0}
        ?disabled=${this.disabled}
        ?focused=${this._focused}
        ?pressed=${this._pressed}
        ?checked=${this.checked}
        ?loading=${this.loading}
        @click=${this.handleToggleValue}
        @focus=${this._handleFocus}
        @blur=${this._handleBlur}
        @keyup=${this._handleKeyup}
        @keydown=${this._handleKeydown}
      >
        <div class="indicator">${when(this.loading, () => html`<slot name="loading"></slot>`)}</div>
        <div class="content">${when(this.checked, () => html`<slot name="checked">${this.checkedText}</slot>`, () => html`<slot name="unchecked">${this.uncheckedText}</slot>`)}</div>
      </button>
    `;
  }

  public handleToggleValue() {
    if (this.disabled || this.loading) return;
    this.checked = !this.checked;
    this.dispatchEvent(new CustomEvent('change', {
      detail: {
        checked: this.checked,
      },
    }));
  }

  private _handleFocus() {
    if (this.disabled) return;
    this._focused = true;
  }

  private _handleBlur() {
    if (this.disabled) return;
    this._focused = false;
  }

  private _handleKeyup(e: KeyboardEvent) {
    if (this.loading) return;
    if (e.code === 'Space') {
      this.handleToggleValue();
      this._pressed = false;
    }
  }

  private _handleKeydown(e: KeyboardEvent) {
    if (this.loading) return;
    if (e.code === 'Space') {
      e.preventDefault();
      this._pressed = true;
    }
  }
}

import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { isStringNumber } from '@/shared';
import styles from './styles';

const getPixelRatio = (context: CanvasRenderingContext2D) => {
  if (!context) return 1;

  const backingStore = (context as any).backingStorePixelRatio
    || (context as any).webkitBackingStorePixelRatio
    || (context as any).mozBackingStorePixelRatio
    || (context as any).msBackingStorePixelRatio
    || (context as any).oBackingStorePixelRatio
    || (context as any).backingStorePixelRatio
    || 1;

  return (window.devicePixelRatio || 1) / backingStore;
};

export class Watermark extends LitElement {
  static override styles = styles;

  @property({ type: Number }) width = 120;
  @property({ type: Number }) height = 64;
  @property({ type: Number, attribute: 'gap-x' }) gapX = 100;
  @property({ type: Number, attribute: 'gap-y' }) gapY = 100;
  @property({ type: Number, attribute: 'z-index' }) zIndex = 9;

  /**
   * 水印在画布上距离左侧的水平偏移量，默认处于中间位置
   */
  @property({ type: Number, attribute: 'offset-x' }) offsetX = 0;

  /**
   * 水印在画布上距离顶部的垂直偏移量，默认处于中间位置
   */
  @property({ type: Number, attribute: 'offset-y' }) offsetY = 0;
  /**
   * 水印绘制时，旋转的角度，单位 °
   */
  @property({ type: Number }) rotate = -22;
  /**
   * 高清印图片源, 为了高清屏幕显示，建议使用 2 倍或 3 倍图，优先使用图片渲染水印
   */
  @property() image?: string = undefined;
  @property() content = '';

  // Font
  @property({ attribute: 'color' }) fontColor: CanvasFillStrokeStyles['fillStyle'] = 'rgba(0,0,0,.15)';
  @property({ attribute: 'font-style' }) fontStyle: 'none' | 'normal' | 'italic' | 'oblique' = 'normal';
  @property({ attribute: 'font-family' }) fontFamily = 'sans-serif';
  @property({
    attribute: 'font-weight',
    converter: v => v && (['normal', 'light', 'weight'].includes(v) || !Number.isNaN(Number.parseInt(v))) ? v : 'normal',
  }) fontWeight: 'normal' | 'light' | 'weight' | number = 'normal';
  @property({
    type: Number,
    attribute: 'font-size',
    converter: v => v && isStringNumber(v) ? Number.parseFloat(v) : 16,
  }) fontSize = 16;

  @state() private _base64Url = '';

  override render() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const ratio = getPixelRatio(ctx);
    const canvasWidth = `${(this.gapX + this.width) * ratio}px`;
    const canvasHeight = `${(this.gapY + this.height) * ratio}px`;
    const canvasOffsetLeft = this.offsetX || this.gapX / 2;
    const canvasOffsetTop = this.offsetY || this.gapY / 2;

    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);

    // 旋转字符 rotate
    ctx.translate(canvasOffsetLeft * ratio, canvasOffsetTop * ratio);
    ctx.rotate((Math.PI / 180) * this.rotate);

    const markWidth = this.width * ratio;
    const markHeight = this.height * ratio;

    if (this.image) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.referrerPolicy = 'no-referrer';
      img.src = this.image;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, markWidth, markHeight);
        this._base64Url = canvas.toDataURL();
      };
    } else if (this.content) {
      const markSize = this.fontSize * ratio;
      ctx.font = `${this.fontStyle} normal ${this.fontWeight} ${markSize}px/${markHeight}px ${this.fontFamily}`;
      ctx.fillStyle = this.fontColor;
      ctx.fillText(this.content, 0, 0);
      this._base64Url = canvas.toDataURL();
    }

    const overrideMarkStyle = `z-index: ${this.zIndex}; background-size: ${this.gapX + this.width}px; background-repeat: repeat; background-image: url(${this._base64Url});`;

    return html`
      <slot></slot>
      <div marker style=${overrideMarkStyle}></div>
    `;
  }
}

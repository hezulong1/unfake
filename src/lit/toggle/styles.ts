import { css } from 'lit';
import * as light from '../_styles/light';
import { opacityDisabled } from '../_styles/variables';

const styles = css`
  :host {
    --width: 40px;
    --height: 22px;

    --border-radius: 22px;
    --default-background: rgba(0,0,0,.14);

    --button-offset: 2px;
    --button-size: calc(var(--height) - var(--button-offset) * 2);
    --button-color: #fff;
    --button-box-shadow: 0 0 2px 0 rgb(0,0,0,.2), 0 2px 11.5px 0 rgb(0,0,0,.08), -1px 2px 2px 0 rgb(0,0,0,.1);

    --text-size: 12px;
    --text-color: #fff;
    --text-active-color: #fff;

    display: inline-block;
  }

  button {
    position: relative;
    min-width: var(--width);
    height: var(--height);
    margin: 0;
    padding: 0;
    border: 0;
    outline: none;
    vertical-align: top;
    border-radius: calc(var(--height) / 2);
    background-color: var(--default-background);
    font-size: var(--text-size);
    user-select: none;
    transition: background-color .3s ease-in-out, box-shadow .3s ease-in-out;
    box-sizing: border-box;
  }

  .indicator {
    position: absolute;
    top: var(--button-offset);
    left: var(--button-offset);
    z-index: 1;
    width: var(--button-size);
    height: var(--button-size);
    background-color: var(--button-color);
    border-radius: 50%;
    transition: transform .3s ease-in-out, background-color .3s ease-in-out, left .3s ease-in-out, opacity .3s ease-in-out, box-shadow .3s ease-in-out;
    cursor: inherit;
    box-shadow: var(--button-box-shadow);
    box-sizing: border-box;
  }

  .content { --ml: calc(var(--button-offset) + 4px); --mr: calc(var(--button-offset) * 2 + var(--button-size)); display: flex; height: 100%; margin: 0 var(--ml) 0 var(--mr); line-height: 1; align-items: center; font-size: inherit; color: var(--text-color); transition: margin .3s ease-in-out; }

  button:active .indicator,
  [pressed] .indicator { transform: scale(.9); }

  [checked] { background-color: var(--color-primary); }
  [checked] .indicator { left: calc(100% - var(--button-offset) - var(--button-size)); }
  [checked] .content { --ml: calc(var(--button-offset) * 2 + var(--button-size)); --mr: calc(var(--button-offset) + 4px); color: var(--text-active-color); }

  [disabled] { opacity: ${opacityDisabled}; }

  [focused] { box-shadow: var(--box-shadow-focus); }
  [focused]:focus-visible::after { content: ""; display: block; position: absolute; top: 0; right: 0; bottom: 0; left: 0; border: 1px solid transparent; border-radius: inherit; animation: focus-in .6s forwards; }

  ::slotted(*) { pointer-events: none; }
`;

export default [light.focusIn, light.global, styles];

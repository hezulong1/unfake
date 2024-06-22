import { css } from 'lit';

export default css`
  :host {
    position: relative;
    display: block;
  }

  :host([full]) {
    height: 100%;
  }

  :host [marker] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
`;

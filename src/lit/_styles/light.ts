import { css } from 'lit';

const from = css`#a44cf6`;
const to = css`rgba(164, 76, 246, 0.6)`;

export const focusIn = css`
  @keyframes focus-in {
    0% { border-color: ${from}; box-shadow: 0 0 20px ${from}; }
    100% { border-color: ${to}; box-shadow: 0 0 4px ${to}; }
  }
`;

export const global = css`
  :host {
    --color-base: #ffffff;
    --color-base-reverse: #000000;

    --color-border: #767676;
    --color-border-hover: #4f4f4f;
    --color-border-disabled: #d2d2d2;

    --color-background: #ffffff;
    --color-background-disabled: #f9f9f9;

    --color-primary: #2c77f6;
    --color-primary-hover: #225ec1;

    --box-shadow-focus: 0 0 0 3px rgba(44, 119, 246, 0.3);
  }
`;

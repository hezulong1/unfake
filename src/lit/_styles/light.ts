import { css } from 'lit';
import * as commonVariables from './variables';

export const primaryDefault = css`#2c77f6`;
export const primaryDefault200 = css`rgba(44, 119, 246, 0.2)`;
export const primaryActive = css`#225ec1`;
export const accentDefault = css`#a44cf6`;
export const accentDefault600 = css`rgba(164, 76, 246, 0.6)`;

export default css`
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
    --color-primary-focus: rgba(44, 119, 246, 0.2);

    --color-accent: #a44cf6;
    --color-accent-focus: rgba(164, 76, 246, 0.6);

    --border-radius: ${commonVariables.borderRadius};
    --opacity-disabled: ${commonVariables.opacityDisabled};
    --box-shadow-focus: 0 0 0 3px var(--color-primary-focus);
  }

  @keyframes focus-in {
    0% { border-color: var(--color-accent); box-shadow: 0 0 20px var(--color-accent); }
    100% { border-color: var(--color-accent-focus); box-shadow: 0 0 4px var(--color-accent-focus); }
  }
`;

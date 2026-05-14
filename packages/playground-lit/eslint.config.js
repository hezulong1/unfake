import globals from 'globals';
import h21 from 'eslint-config-h21';
import { configs as litConfigs } from 'eslint-plugin-lit';
import { configs as wcConfigs } from 'eslint-plugin-wc';

export default h21({
  style: true,
  ts: true,
  globals: globals['shared-node-browser'],
}).append(
  {
    settings: {
      wc: {
        'elementBaseClasses': ['LitElement'],
      },
    },
  },
  litConfigs['flat/recommended'],
  wcConfigs['flat/recommended'],
);

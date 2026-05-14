import globals from 'globals';
import h21 from 'eslint-config-h21';

export default h21({
  style: true,
  ts: true,
  globals: globals['shared-node-browser'],
});

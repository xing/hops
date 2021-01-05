import createDeprecate from 'depd';

const deprecate = createDeprecate('hops-react');

deprecate(
  '[DEP004] Do not use deep imports to "hops-react" (https://github.com/xing/hops/blob/master/DEPRECATIONS.md#dep004).'
);

export { Status, Miss, Header } from '../router';
export { importComponent } from '../import-component';
export { render } from '../render';

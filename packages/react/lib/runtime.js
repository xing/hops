const deprecate = require('depd')('hops-react');

deprecate(
  '[DEP004] Do not use deep imports to "hops-react" (https://github.com/xing/hops/blob/master/DEPRECATIONS.md#dep004).'
);
// TODO: clean-up after implementing this in internal Hops
const { Status, Miss, Header } = require('../router');
const { importComponent } = require('../import-component');
const { render } = require('../render');

// TODO: clean-up after implementing this in internal Hops
exports.render = render;
exports.Status = Status;
exports.Miss = Miss;
exports.Header = Header;
exports.importComponent = importComponent;

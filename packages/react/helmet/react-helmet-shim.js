const deprecate = require('depd')('hops-react');
const reactHelmetAsync = require('react-helmet-async');

deprecate(
  '[DEP004] react-helmet is deprecated. Please switch to react-helmet-async instead (https://github.com/untool/untool/blob/master/DEPRECATIONS.md#dep004).'
);

module.exports = exports = reactHelmetAsync;
exports.__esModule = true;
exports.default = reactHelmetAsync.Helmet;

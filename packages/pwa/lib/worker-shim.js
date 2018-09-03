// This is a webpack alias, defined in mixin.core.js
/* eslint-disable-next-line node/no-missing-require */
const { getConfigAndMixins } = require('./loader-shim');

(function execute() {
  // This is a webpack alias, defined in mixin.core.js
  /* eslint-disable-next-line node/no-missing-require */
  let entryPoint = require('hops-worker-entry-point');
  if (typeof entryPoint.default === 'function') {
    entryPoint = entryPoint.default;
  }
  entryPoint(getConfigAndMixins().config, HOPS_ASSETS); // eslint-disable-line no-undef
  if (module.hot) {
    module.hot.accept(require.resolve('hops-worker-entry-point'), () =>
      setTimeout(execute)
    );
  }
})();

/* eslint-disable import/no-unresolved */
/* eslint-disable node/no-missing-import */
import entryPoint from 'hops/entrypoint';
/* eslint-enable node/no-missing-import */
/* eslint-enable import/no-unresolved */

entryPoint();

if (module.hot) {
  module.hot.accept('hops/entrypoint', () => entryPoint());
}

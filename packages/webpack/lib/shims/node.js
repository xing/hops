import 'source-map-support/register';

// eslint-disable-next-line import/no-unresolved, node/no-missing-import
import entryPoint from 'hops/entrypoint';
import log from 'webpack/hot/log';

if (module.hot) {
  log.setLogLevel('none');
  module.hot.accept('hops/entrypoint', () => entryPoint());
}

export default entryPoint;

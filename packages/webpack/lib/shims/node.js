if (!require('module').prototype._compile.__sourceMapSupport) {
  require('source-map-support/register');
}

if (process.env.__HOPS_FAST_DEV__ !== 'true') {
  require('core-js');
}

if (module.hot) {
  require('webpack/hot/log').setLogLevel('none');
  module.hot.accept('hops/entrypoint');
}

module.exports = (...args) => {
  // eslint-disable-next-line node/no-missing-require
  return require('hops/entrypoint').default(...args);
};

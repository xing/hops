const { Mixin } = require('hops-bootstrap');

class ReactHelmetCoreMixin extends Mixin {
  configureBuild(webpackConfig) {
    // TODO: remove with next major version
    webpackConfig.resolve.alias['react-helmet'] = require.resolve(
      './react-helmet-shim'
    );
  }
}

module.exports = ReactHelmetCoreMixin;

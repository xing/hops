const { Mixin } = require('hops-mixin');

// - react-redux  (prod: 12kb)
// - redux        (prod: 7kb)
const getMaxAssetSizeIncrease = env => {
  const bundleSizeProd = 19;
  switch (env) {
    case 'development::build':
      return bundleSizeProd * 4.5 * 1024;
    case 'development::develop':
      return bundleSizeProd * 13 * 1024;
    case 'production::build':
    case 'production::develop':
      return bundleSizeProd * 1024;
    default:
      return 0;
  }
};

class ReduxCoreMixin extends Mixin {
  configureBuild(webpackConfig, _, target) {
    const nodeEnv = process.env.NODE_ENV || 'development';
    webpackConfig.performance.maxAssetSize += getMaxAssetSizeIncrease(
      `${nodeEnv}::${target}`
    );
  }
}

module.exports = ReduxCoreMixin;

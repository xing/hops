const { Mixin } = require('hops-bootstrap');

class ReactCoreMixin extends Mixin {
  configureBuild(webpackConfig, { fileLoaderConfig, jsLoaderConfig }, target) {
    webpackConfig.resolve.extensions.push('.jsx');
    fileLoaderConfig.exclude.push(/\.jsx$/);
    jsLoaderConfig.test.push(/\.jsx$/);

    jsLoaderConfig.options.presets.push(require.resolve('@babel/preset-react'));

    jsLoaderConfig.options.plugins.push(
      require.resolve('@babel/plugin-transform-flow-strip-types'),
      require.resolve('@babel/plugin-proposal-class-properties')
    );

    if (target !== 'develop' && process.env.NODE_ENV === 'production') {
      jsLoaderConfig.options.plugins.push(
        require.resolve('babel-plugin-transform-react-remove-prop-types')
      );
    }
  }

  diagnose({ detectDuplicatePackages }) {
    detectDuplicatePackages('react', 'react-dom');
  }
}

module.exports = ReactCoreMixin;

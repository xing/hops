'use strict';

const { Mixin } = require('hops-bootstrap');

module.exports = class ReactMixin extends Mixin {
  configureBuild(webpackConfig, { fileLoaderConfig, jsLoaderConfig }, target) {
    webpackConfig.resolve.extensions.push('.jsx');
    fileLoaderConfig.exclude.push(/\.jsx$/);
    jsLoaderConfig.test.push(/\.jsx$/);

    // TODO: remove with next major version
    webpackConfig.resolve.alias['react-helmet'] = require.resolve(
      '../lib/react-helmet-shim'
    );

    jsLoaderConfig.options.presets.push(require.resolve('@babel/preset-react'));

    if (target !== 'develop' && process.env.NODE_ENV === 'production') {
      jsLoaderConfig.options.plugins.push(
        require.resolve('babel-plugin-transform-react-remove-prop-types')
      );
    }
    jsLoaderConfig.options.plugins.push(require.resolve('../lib/babel'));
  }
  diagnose({ detectDuplicatePackages }) {
    detectDuplicatePackages('react', 'react-dom');
  }
};

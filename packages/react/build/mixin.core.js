const { Mixin } = require('hops-mixin');

class ReactCoreMixin extends Mixin {
  configureBuild(webpackConfig, { fileLoaderConfig, jsLoaderConfig }, target) {
    const { experimentalEsbuild, experimentalSWC } = this.options;

    webpackConfig.resolve.extensions.push('.jsx');
    fileLoaderConfig.exclude.push(/\.jsx$/);
    jsLoaderConfig.test.push(/\.jsx$/);

    if (experimentalEsbuild) {
      jsLoaderConfig.use[0].options.loader = 'jsx';
    } else if (experimentalSWC) {
      jsLoaderConfig.use[0].options.jsc.parser.jsx = true;
    } else {
      jsLoaderConfig.options.presets.push([
        require.resolve('@babel/preset-react'),
        { runtime: 'automatic' },
      ]);

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
  }

  handleArguments(argv) {
    this.options = { ...this.options, ...argv };
  }

  diagnose({ detectDuplicatePackages }) {
    detectDuplicatePackages('react', 'react-dom');
  }
}

module.exports = ReactCoreMixin;

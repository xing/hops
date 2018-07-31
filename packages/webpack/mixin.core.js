const { Mixin } = require('hops-mixin');
const prettyMs = require('pretty-ms');

class LoggerPlugin {
  apply(compiler) {
    compiler.hooks.done.tap('hops-logger-plugin', stats => {
      if (stats.compilation.name === 'develop') {
        console.log(
          'Compiled successfully',
          'in',
          prettyMs(stats.endTime - stats.startTime)
        );
      }
    });
  }
}

class WebpackCoreMixin extends Mixin {
  configureBuild(webpackConfig) {
    webpackConfig.plugins.push(new LoggerPlugin());
    webpackConfig.resolve.mainFields = webpackConfig.resolve.mainFields.filter(
      f => f !== 'module'
    );
    return webpackConfig;
  }

  inspectBuild(stats) {
    console.log(
      stats.toString({
        colors: true,
        hash: false,
        modules: false,
        entrypoints: false,
        chunks: false,
      })
    );
  }
}

module.exports = WebpackCoreMixin;

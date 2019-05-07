const { existsSync } = require('fs');
const { join } = require('path');
const { Mixin } = require('hops-mixin');

class TypescriptMixin extends Mixin {
  configureBuild(webpackConfig, { jsLoaderConfig, allLoaderConfigs }) {
    const { loader, options, exclude } = jsLoaderConfig;

    allLoaderConfigs.unshift({
      test: /\.tsx?$/,
      exclude,
      use: [
        {
          loader,
          options,
        },
        {
          loader: require.resolve('ts-loader'),
        },
      ],
    });
    webpackConfig.resolve.extensions.push('.ts', '.tsx');
  }

  diagnose() {
    const tsConfigPath = join(this.config.rootDir, 'tsconfig.json');
    /* eslint-disable node/no-extraneous-require */
    const exampleTsConfigPath = require.resolve(
      'hops-typescript/tsconfig.json'
    );
    /* eslint-enable node/no-extraneous-require */
    if (!existsSync(tsConfigPath)) {
      return `No "tsconfig.json" file found in your project root directory ("${
        this.config.rootDir
      }").\nAs a starting point you can copy our minimal example config file: "cp ${exampleTsConfigPath} ${
        this.config.rootDir
      }/tsconfig.json"`;
    }
  }
}

module.exports = TypescriptMixin;

const { existsSync } = require('fs');
const { join } = require('path');
const { Mixin } = require('hops-mixin');
// eslint-disable-next-line node/no-unpublished-require
const chalk = require('chalk');

class TypescriptMixin extends Mixin {
  configureBuild(webpackConfig, { jsLoaderConfig, allLoaderConfigs }, target) {
    const { loader, options, exclude } = jsLoaderConfig;
    const targetDevelop = target === 'develop';
    const compilerOptions = targetDevelop
      ? { compilerOptions: { isolatedModules: true } }
      : undefined;

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
          options: {
            ...compilerOptions,
            transpileOnly: targetDevelop,
          },
        },
      ],
    });
    webpackConfig.resolve.extensions.push('.ts', '.tsx');
  }

  diagnose() {
    const { rootDir } = this.config;
    const tsConfigPath = join(rootDir, 'tsconfig.json');

    if (!existsSync(tsConfigPath)) {
      const tsConfigContent = JSON.stringify(
        {
          extends: 'hops-typescript/tsconfig.json',
        },
        null,
        2
      );

      return chalk`
{red No "tsconfig.json" file found in your project root directory ("${rootDir}").}
{red To get started, create a "tsconfig.json" file in your project's root with the following content:}
{cyan ${tsConfigContent}}
`;
    }

    const hopsTsConfig = require(join(__dirname, 'tsconfig.json'));
    const tsConfig = require(tsConfigPath);

    for (let property of ['target', 'moduleResolution']) {
      if (
        tsConfig.compilerOptions &&
        tsConfig.compilerOptions[property] !==
          hopsTsConfig.compilerOptions[property]
      ) {
        return chalk.red(
          `Please do not overwrite the value "compilerOptions.${property}" in your "tsconfig.json", otherwise Hops will not work as expected.`
        );
      }
    }
  }
}

module.exports = TypescriptMixin;

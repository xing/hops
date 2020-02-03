const { existsSync } = require('fs');
const { join } = require('path');
const { Mixin } = require('hops-mixin');
// eslint-disable-next-line node/no-unpublished-require
const chalk = require('chalk');

const getCompilerOptions = (ts, rootPath) => {
  const parseConfigHost = {
    fileExists: ts.sys.fileExists,
    readFile: ts.sys.readFile,
    readDirectory: ts.sys.readDirectory,
    useCaseSensitiveFileNames: true,
  };
  const configFileName = ts.findConfigFile(
    rootPath,
    ts.sys.fileExists,
    'tsconfig.json'
  );
  const { config } = ts.readConfigFile(configFileName, ts.sys.readFile);
  const { options } = ts.parseJsonConfigFileContent(
    config,
    parseConfigHost,
    rootPath
  );

  return options;
};

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
    let ts;
    try {
      ts = require('typescript');
    } catch (e) {
      return;
    }
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

    const compilerOptions = getCompilerOptions(ts, rootDir);
    const properties = {
      target: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
    };

    for (let [property, value] of Object.entries(properties)) {
      if (compilerOptions[property] !== value) {
        return chalk.red(
          `Please do not overwrite the value "compilerOptions.${property}" in your "tsconfig.json", otherwise Hops will not work as expected.`
        );
      }
    }
  }
}

module.exports = TypescriptMixin;

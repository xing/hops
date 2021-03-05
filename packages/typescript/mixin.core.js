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
    const { experimentalEsbuild } = this.options;

    webpackConfig.resolve.extensions.push('.ts', '.tsx');

    if (experimentalEsbuild) {
      const {
        include,
        exclude,
        use: [{ loader, options }, ...loaders],
      } = jsLoaderConfig;

      allLoaderConfigs.unshift(
        {
          test: /\.ts$/,
          include,
          exclude,
          use: [
            {
              loader,
              options: {
                ...options,
                loader: 'ts',
              },
            },
            ...loaders,
          ],
        },
        {
          test: /\.tsx$/,
          include,
          exclude,
          use: [
            {
              loader,
              options: {
                ...options,
                loader: 'tsx',
              },
            },
            ...loaders,
          ],
        }
      );
    } else {
      const { exclude, loader, options } = jsLoaderConfig;

      const isDevelop =
        target === 'develop' ||
        (target === 'node' && process.env.NODE_ENV !== 'production');
      const loaderOptions = isDevelop
        ? { compilerOptions: { isolatedModules: true }, transpileOnly: true }
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
            options: loaderOptions,
          },
        ],
      });
    }
  }

  handleArguments(argv) {
    this.options = { ...this.options, ...argv };
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
      target: ts.ScriptTarget.ESNext,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
      jsx: ts.JsxEmit.Preserve,
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

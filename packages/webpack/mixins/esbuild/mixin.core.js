const { Mixin } = require('hops-mixin');
const importComponentTransform = require.resolve(
  './importComponentTransform.js'
);

const isLoaderFor = (file) => (test) => {
  if (Array.isArray(test)) {
    return test.some(isLoaderFor(file));
  } else if (typeof test === 'object' && typeof test.test === 'function') {
    return test.test(file);
  } else {
    return false;
  }
};
const isTsLoader = isLoaderFor('test.ts');
const isJsLoader = isLoaderFor('test.js');

class HopsEsbuildMixin extends Mixin {
  configureBuild({ optimization, plugins }, { allLoaderConfigs }, target) {
    const { experimentalEsbuild } = this.options;

    if (!experimentalEsbuild) {
      return;
    }

    const esbuildTarget = target === 'node' ? 'node12' : 'es2015';
    // NOTE: We don't want to ship esbuild, so we just assume it is installed
    // when someone wants to use it.
    // eslint-disable-next-line node/no-missing-require
    const { ESBuildPlugin, ESBuildMinifyPlugin } = require('esbuild-loader');

    // NOTE: We iterate all configs as we want to replace the entry instead of
    // mutating the object, otherwise we would need to explicitly remove all
    // other properties on the config object that are not related to esbuild.
    for (let index = 0; index < allLoaderConfigs.length; index++) {
      const { test, include, exclude } = allLoaderConfigs[index];
      const esbuildLoader = isTsLoader(test)
        ? 'tsx'
        : isJsLoader(test)
        ? 'jsx'
        : null;

      if (esbuildLoader) {
        allLoaderConfigs[index] = {
          test,
          include,
          exclude,
          use: [
            {
              loader: 'esbuild-loader',
              options: {
                loader: esbuildLoader,
                target: esbuildTarget,
              },
            },
            importComponentTransform,
          ],
        };
      }
    }

    // NOTE: We don't decide here whether to minify or not but instead just
    // override it if someone else has already configured it.
    if (
      Array.isArray(optimization.minimizer) &&
      optimization.minimizer.length > 0
    ) {
      optimization.minimizer = [
        new ESBuildMinifyPlugin({
          target: esbuildTarget,
          minify: true,
          sourcemap: true,
        }),
      ];
    }

    plugins.push(new ESBuildPlugin());
  }

  handleArguments(argv) {
    this.options = { ...this.options, ...argv };
  }
}

module.exports = HopsEsbuildMixin;

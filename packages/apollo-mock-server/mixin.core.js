const { existsSync } = require('fs');
const { Mixin } = require('hops-mixin');
const {
  internal: { createWebpackMiddleware, StatsFilePlugin },
} = require('@untool/webpack');

function exists(path) {
  try {
    require.resolve(path);
    return true;
  } catch (e) {
    return false;
  }
}

class GraphQLMixin extends Mixin {
  configureServer(rootApp, middleware, mode) {
    if (
      !exists(this.config.graphqlMockSchemaFile) ||
      process.env.NODE_ENV === 'production'
    ) {
      return;
    }

    middleware.initial.push({
      path: this.config.graphqlMockServerPath,
      handler: createWebpackMiddleware(
        ['graphql-mock-server', 'node'],
        mode === 'develop',
        this
      ),
    });
  }

  configureBuild(webpackConfig, loaderConfigs, target) {
    const { allLoaderConfigs } = loaderConfigs;

    allLoaderConfigs.splice(allLoaderConfigs.length - 1, 0, {
      test: /\.(graphql|gql)$/,
      loader: 'graphql-tag/loader',
    });

    webpackConfig.externals.push('encoding');

    if (process.env.NODE_ENV === 'production') {
      return;
    }

    if (exists(this.config.graphqlMockSchemaFile)) {
      webpackConfig.resolve.alias[
        'hops-apollo-mock-server/schema'
      ] = require.resolve(this.config.graphqlMockSchemaFile);
    }

    if (exists(this.config.graphqlMockContextExtenderFile)) {
      webpackConfig.resolve.alias[
        'hops-apollo-mock-server/context-extender'
      ] = require.resolve(this.config.graphqlMockContextExtenderFile);
    }

    if (target === 'graphql-mock-server') {
      webpackConfig.externals.push(
        'apollo-server-express',
        'express',
        'graphql'
      );

      webpackConfig.output.filename = 'hops-graphql-mock-server.js';
      webpackConfig.resolve.alias['@untool/entrypoint'] = require.resolve(
        './lib/mock-server-middleware'
      );

      webpackConfig.plugins = webpackConfig.plugins.filter(
        p => !(p instanceof StatsFilePlugin)
      );
    }
  }

  diagnose({ detectDuplicatePackages }) {
    detectDuplicatePackages('graphql');
    if (!existsSync(this.config.fragmentsFile)) {
      return [
        `Could not find a graphql introspection query result at "${this.config.fragmentsFile}".`,
        'You might need to execute "hops graphql introspect"',
      ];
    }
  }
}

module.exports = GraphQLMixin;

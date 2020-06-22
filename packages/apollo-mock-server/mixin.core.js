const { Mixin } = require('hops-mixin');
const {
  sync: { pipe },
} = require('mixinable');
const {
  internal: { createWebpackMiddleware, StatsFilePlugin },
} = require('hops-webpack');
const {
  internal: { validate, invariant },
} = require('hops-bootstrap');

function exists(path) {
  try {
    require.resolve(path);
    return true;
  } catch (e) {
    return false;
  }
}

function isResponseObject(res) {
  return typeof res === 'object' && res.setHeader && res.send;
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
      handler: (req, res, next) => {
        this.enhanceApolloMockServerResponse(res);
        createWebpackMiddleware(
          ['graphql-mock-server', 'node'],
          mode === 'develop',
          this
        )(req, res, next);
      },
    });
  }

  configureBuild(webpackConfig, loaderConfigs, target) {
    const { allLoaderConfigs } = loaderConfigs;

    if (
      !allLoaderConfigs.find(({ loader }) => loader === 'graphql-tag/loader')
    ) {
      allLoaderConfigs.splice(allLoaderConfigs.length - 1, 0, {
        test: /\.(graphql|gql)$/,
        loader: 'graphql-tag/loader',
      });
    }

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
      // todo: remove this if not used anymore
      webpackConfig.resolve.alias['@untool/entrypoint'] = require.resolve(
        './lib/mock-server-middleware'
      );
      webpackConfig.resolve.alias['hops/entrypoint'] = require.resolve(
        './lib/mock-server-middleware'
      );

      webpackConfig.plugins = webpackConfig.plugins.filter(
        (p) => !(p instanceof StatsFilePlugin)
      );
    }
  }

  diagnose({ detectDuplicatePackages }) {
    detectDuplicatePackages('graphql');
  }
}

GraphQLMixin.strategies = {
  enhanceApolloMockServerResponse: validate(pipe, ([res]) => {
    invariant(
      isResponseObject(res),
      'enhanceApolloMockServerResponse(): Received invalid response object'
    );
  }),
};

module.exports = GraphQLMixin;

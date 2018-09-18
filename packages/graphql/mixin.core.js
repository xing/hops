const { Mixin } = require('hops-mixin');
const renderMiddleware = require('@untool/webpack/lib/middleware/render');
const { StatsFilePlugin } = require('@untool/webpack/lib/plugins/stats');

class GraphQLMixin extends Mixin {
  configureServer(rootApp, middleware) {
    if (!this.config.graphqlMocks || !this.config.enableGraphqlMockServer) {
      return rootApp;
    }

    if (process.env.NODE_ENV === 'production') {
      console.warn(
        'It is not recommended to run the GraphQL Mock Server in production.'
      );
    }

    const webpackConfig = this.getBuildConfig('node');

    webpackConfig.output.filename = 'hops-graphql-mock-server.js';

    Object.assign(webpackConfig.resolve.alias, {
      'hops-graphql-mocks': this.config.graphqlMocks,
      '@untool/entrypoint': require.resolve('./lib/mock-server-middleware'),
    });

    const configLoaderIndex = webpackConfig.module.rules.findIndex(
      r =>
        require.resolve(r.loader) ===
        require.resolve('@untool/webpack/lib/utils/loader')
    );

    webpackConfig.module.rules[configLoaderIndex].options.target = 'none';

    webpackConfig.plugins = webpackConfig.plugins.filter(
      p => !(p instanceof StatsFilePlugin)
    );

    middleware.preroutes.unshift(renderMiddleware(webpackConfig));

    return rootApp;
  }

  configureBuild(config, loaderConfigs) {
    const { allLoaderConfigs } = loaderConfigs;

    const tagLoader = {
      test: /\.(graphql|gql)$/,
      loader: 'graphql-tag/loader',
    };

    const fragmentTypesLoader = {
      test: require.resolve('./fragment-types.json'),
      loader: require.resolve('./lib/fragment-types-loader'),
      options: {
        graphqlUri: this.config.graphqlUri,
        graphqlSchemaFile: this.config.graphqlSchemaFile,
      },
    };

    allLoaderConfigs.splice(
      allLoaderConfigs.length - 1,
      0,
      tagLoader,
      fragmentTypesLoader
    );

    return config;
  }
}

module.exports = GraphQLMixin;

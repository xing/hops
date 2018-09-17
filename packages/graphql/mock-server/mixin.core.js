const { Mixin } = require('hops-mixin');
const renderMiddleware = require('@untool/webpack/lib/middleware/render');

class GraphQLMockServerMixin extends Mixin {
  configureServer(rootApp, middleware) {
    if (!this.config.graphqlMocks) {
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
      '@untool/entrypoint': require.resolve('./middleware'),
    });

    middleware.preroutes.push(renderMiddleware(webpackConfig));

    return rootApp;
  }
}

module.exports = GraphQLMockServerMixin;

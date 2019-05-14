const { Mixin } = require('hops-mixin');
const fetch = require('cross-fetch');
const { HttpLink } = require('apollo-link-http');

const customFetch = getServerAddress => async (uri, options) => {
  const urlSuffix =
    typeof Headers !== 'undefined' && options.headers instanceof Headers
      ? options.headers.get('x-url-suffix')
      : options.headers['x-url-suffix'];
  const newUri = urlSuffix ? `${getServerAddress()}/graphql/${urlSuffix}` : uri;

  return await fetch(newUri, options);
};

module.exports = class GraphQlMixin extends Mixin {
  getApolloLink() {
    return new HttpLink({
      uri: this.config.graphqlUri,
      // TODO: get correct server address
      fetch: customFetch(() => this.serverAddress || 'http://localhost:8080'),
    });
  }
};

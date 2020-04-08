const { Mixin } = require('hops-mixin');
const fetch = require('cross-fetch');
const { HttpLink } = require('apollo-link-http');

const customFetch = (serverAddress) => (uri, options) => {
  const urlSuffix =
    typeof Headers !== 'undefined' && options.headers instanceof Headers
      ? options.headers.get('x-url-suffix')
      : options.headers['x-url-suffix'];
  const newUri = urlSuffix ? `${serverAddress}/graphql/${urlSuffix}` : uri;

  return fetch(newUri, options);
};

module.exports = class GraphQlMixin extends Mixin {
  bootstrap(_, res) {
    this.serverAddress = res ? res.locals.serverAddress : '';
  }

  getApolloLink() {
    return new HttpLink({
      uri: this.config.graphqlUri,
      fetch: customFetch(this.serverAddress),
    });
  }
};

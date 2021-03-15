const React = require('react');
const {
  Mixin,
  strategies: {
    sync: { override },
  },
} = require('hops-mixin');

const { ApolloProvider, ApolloClient, HttpLink } = require('@apollo/client');
const { InMemoryCache } = require('@apollo/client/cache');
require('cross-fetch/polyfill');

class GraphQLMixin extends Mixin {
  constructor(config, element, { graphql: options = {} } = {}) {
    super(config, element);

    this.options = options;
  }

  getApolloClient() {
    if (this.client) {
      return this.client;
    }
    return (this.client = this.createClient(this.options));
  }

  createClient(options) {
    return new ApolloClient(this.enhanceClientOptions(options));
  }

  enhanceClientOptions(options) {
    return {
      ...options,
      link: this.getApolloLink(),
      cache: this.getApolloCache(),
    };
  }

  getApolloLink() {
    return (
      this.options.link ||
      new HttpLink({
        uri: this.config.graphqlUri,
        fetch: global.fetch,
      })
    );
  }

  getApolloCache() {
    return this.options.cache || global['APOLLO_FRAGMENT_TYPES']
      ? new InMemoryCache({
          possibleTypes: global['APOLLO_FRAGMENT_TYPES'],
        }).restore(global['APOLLO_STATE'])
      : new InMemoryCache().restore(global['APOLLO_STATE']);
  }

  enhanceElement(reactElement) {
    return React.createElement(
      ApolloProvider,
      { client: this.getApolloClient() },
      reactElement
    );
  }
}

GraphQLMixin.strategies = {
  getApolloLink: override,
  getApolloCache: override,
};

module.exports = GraphQLMixin;

const React = require('react');
const {
  Mixin,
  strategies: {
    sync: { override },
  },
} = require('hops-mixin');

const { ApolloProvider, ApolloClient, HttpLink } = require('@apollo/client');
const { InMemoryCache } = require('@apollo/client/cache');

// eslint-disable-next-line node/no-extraneous-require, node/no-missing-require
const possibleTypes = require('hops-react-apollo/fragmentTypes.json');

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
    const { cache = new InMemoryCache({ possibleTypes }) } = this.options;

    return cache.restore(global['APOLLO_STATE']);
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

const React = require('react');
const {
  Mixin,
  strategies: {
    sync: { override },
  },
} = require('hops-mixin');

const { ApolloProvider } = require('react-apollo');
const { default: ApolloClient } = require('apollo-client');
const { HttpLink } = require('apollo-link-http');
const {
  InMemoryCache,
  IntrospectionFragmentMatcher,
  HeuristicFragmentMatcher,
} = require('apollo-cache-inmemory');

class GraphQLMixin extends Mixin {
  constructor(config, element, { graphql: options = {} } = {}) {
    super(config, element);

    this.client = this.createClient(options);
  }

  createClient(options) {
    return new ApolloClient(this.enhanceClientOptions(options));
  }

  enhanceClientOptions(options) {
    return {
      ...options,
      link: options.link || this.getApolloLink(),
      cache: options.cache || this.createCache(),
    };
  }

  getApolloLink() {
    return new HttpLink({
      uri: this.config.graphqlUri,
    });
  }

  createCache() {
    return new InMemoryCache({
      fragmentMatcher: this.createFragmentMatcher(),
    }).restore(global['APOLLO_STATE']);
  }

  createFragmentMatcher() {
    if (global['APOLLO_IQRD']) {
      return new IntrospectionFragmentMatcher({
        introspectionQueryResultData: global['APOLLO_IQRD'],
      });
    }
    return new HeuristicFragmentMatcher();
  }

  enhanceElement(reactElement) {
    return React.createElement(
      ApolloProvider,
      { client: this.client },
      reactElement
    );
  }
}

GraphQLMixin.strategies = {
  getApolloLink: override,
};

module.exports = GraphQLMixin;

const React = require('react');
const {
  Mixin,
  strategies: {
    sync: { override, callable },
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
require('cross-fetch/polyfill');

class GraphQLMixin extends Mixin {
  constructor(config, element, { graphqlOptions = {} } = {}) {
    super(config, element);

    const { linkOptions = {}, cacheOptions = {}, ...options } = graphqlOptions;

    this.options = options;
    this.linkOptions = linkOptions;
    this.cacheOptions = cacheOptions;
  }

  getApolloClient() {
    if (this.client) {
      return this.client;
    }
    return (this.client = this.createClient());
  }

  createClient() {
    return new ApolloClient(this.enhanceClientOptions());
  }

  enhanceClientOptions() {
    const {
      UNSAFE_forwardCredentialsSSR,
      filterCredentials,
      ...options
    } = this.options;

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
        ...this.linkOptions,
      })
    );
  }

  getApolloCache() {
    return (
      this.options.cache ||
      new InMemoryCache({
        fragmentMatcher: this.createFragmentMatcher(),
        ...this.cacheOptions,
      }).restore(global['APOLLO_STATE'])
    );
  }

  createFragmentMatcher() {
    if (global['APOLLO_FRAGMENT_TYPES']) {
      return new IntrospectionFragmentMatcher({
        introspectionQueryResultData: global['APOLLO_FRAGMENT_TYPES'],
      });
    }
    return new HeuristicFragmentMatcher();
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
  createFragmentMatcher: callable,
};

module.exports = GraphQLMixin;

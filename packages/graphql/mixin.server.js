require('isomorphic-fetch');
const React = require('react');
const {
  Mixin,
  strategies: {
    sync: { override, callable },
  },
} = require('hops-mixin');

const { ApolloProvider, getDataFromTree } = require('react-apollo');
const { default: ApolloClient } = require('apollo-client');
const { HttpLink } = require('apollo-link-http');
const {
  InMemoryCache,
  IntrospectionFragmentMatcher,
  HeuristicFragmentMatcher,
} = require('apollo-cache-inmemory');
const introspectionQueryResultData = require('./fragment-types.json');

class GraphQLMixin extends Mixin {
  constructor(config, element, { graphql: options = {} } = {}) {
    super(config, element);
    this.options = options;
  }

  bootstrap() {
    this.client = this.createClient(this.options);
  }

  createClient(options) {
    return new ApolloClient(this.enhanceClientOptions(options));
  }

  enhanceClientOptions(options) {
    return {
      ...options,
      link: this.getApolloLink(),
      cache: this.getApolloCache(),
      ssrMode: true,
    };
  }

  getApolloLink() {
    return (
      this.options.link ||
      new HttpLink({
        uri: this.config.graphqlUri,
      })
    );
  }

  getApolloCache() {
    return (
      this.options.cache ||
      new InMemoryCache({ fragmentMatcher: this.createFragmentMatcher() })
    );
  }

  createFragmentMatcher() {
    return !introspectionQueryResultData
      ? new HeuristicFragmentMatcher()
      : new IntrospectionFragmentMatcher({
          introspectionQueryResultData,
        });
  }

  fetchData(data = {}, element) {
    return this.prefetchData(element).then(() => {
      return {
        ...data,
        globals: {
          ...(data.globals || {}),
          APOLLO_STATE: this.client.cache.extract(),
        },
      };
    });
  }

  prefetchData(element) {
    return this.shouldPrefetchOnServer()
      ? getDataFromTree(element)
      : Promise.resolve();
  }

  shouldPrefetchOnServer() {
    const { shouldPrefetchOnServer } = this.config;
    return typeof shouldPrefetchOnServer === 'boolean'
      ? shouldPrefetchOnServer
      : true;
  }

  getTemplateData(data) {
    return {
      ...data,
      globals: {
        ...data.globals,
        ...(data.fetchedData || {}).globals,
      },
    };
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
  getApolloCache: override,
  createFragmentMatcher: callable,
  shouldPrefetchOnServer: override,
};

module.exports = GraphQLMixin;

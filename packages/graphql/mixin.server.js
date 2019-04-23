const React = require('react');
const { existsSync, readFileSync } = require('fs');
const {
  Mixin,
  strategies: {
    sync: { override, callable, sequence },
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
const fetch = require('cross-fetch');

let introspectionResult = undefined;

class GraphQLMixin extends Mixin {
  constructor(config, element, { graphqlOptions = {} } = {}) {
    super(config, element);

    const { linkOptions = {}, cacheOptions = {}, ...options } = graphqlOptions;

    this.options = options;
    this.linkOptions = linkOptions;
    this.cacheOptions = cacheOptions;

    if (introspectionResult === undefined) {
      try {
        if (existsSync(config.fragmentsFile)) {
          const fileContent = readFileSync(config.fragmentsFile, 'utf-8');
          introspectionResult = JSON.parse(fileContent);
        }
      } catch (_) {
        introspectionResult = null;
      }
    }
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
      ssrMode: true,
    };
  }

  getApolloLink() {
    return (
      this.options.link ||
      new HttpLink({
        uri: this.config.graphqlUri,
        fetch,
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
      })
    );
  }

  createFragmentMatcher() {
    return !introspectionResult
      ? new HeuristicFragmentMatcher()
      : new IntrospectionFragmentMatcher({
          introspectionQueryResultData: introspectionResult,
        });
  }

  fetchData(data = {}, element) {
    return this.prefetchData(element).then(() => data);
  }

  prefetchData(element) {
    const prefetchOnServer = this.canPrefetchOnServer().every(value => value);

    return prefetchOnServer ? getDataFromTree(element) : Promise.resolve();
  }

  canPrefetchOnServer() {
    const { shouldPrefetchOnServer } = this.config;

    return shouldPrefetchOnServer !== false;
  }

  getTemplateData(data) {
    return {
      ...data,
      globals: {
        ...data.globals,
        APOLLO_FRAGMENT_TYPES: introspectionResult,
        APOLLO_STATE: this.getApolloClient().cache.extract(),
      },
    };
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
  canPrefetchOnServer: sequence,
};

module.exports = GraphQLMixin;

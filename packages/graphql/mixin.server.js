require('isomorphic-fetch');
const React = require('react');
const { existsSync, readFileSync } = require('fs');
const {
  Mixin,
  strategies: {
    sync: { override },
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

let introspectionResult = undefined;
let warned = false;

class GraphQLMixin extends Mixin {
  constructor(config, element, { graphql: options = {} } = {}) {
    super(config, element);

    this.options = options;

    if (introspectionResult === undefined) {
      try {
        if (existsSync(config.fragmentsFile)) {
          const fileContent = readFileSync(config.fragmentsFile, 'utf-8');
          introspectionResult = JSON.parse(fileContent);
        } else if (!warned) {
          warned = true;
          console.warn(
            'Could not find a graphql introspection query result at %s.',
            config.fragmentsFile,
            'You might need to execute `hops graphql introspect`'
          );
        }
      } catch (_) {
        introspectionResult = null;
      }
    }
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
      link: options.link || this.getApolloLink(),
      cache: options.cache || this.createCache(),
      ssrMode: true,
    };
  }

  getApolloLink() {
    return new HttpLink({
      uri: this.config.graphqlUri,
    });
  }

  createCache() {
    return new InMemoryCache({ fragmentMatcher: this.createFragmentMatcher() });
  }

  createFragmentMatcher() {
    return !introspectionResult
      ? new HeuristicFragmentMatcher()
      : new IntrospectionFragmentMatcher({
          introspectionQueryResultData: introspectionResult,
        });
  }

  fetchData(data = {}, element) {
    return this.prefetchData(element).then(() => {
      return {
        ...data,
        globals: {
          ...(data.globals || {}),
          APOLLO_FRAGMENT_TYPES: introspectionResult,
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
  shouldPrefetchOnServer: override,
};

module.exports = GraphQLMixin;

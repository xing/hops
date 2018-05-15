require('isomorphic-fetch');
const React = require('react');
const { existsSync, readFileSync } = require('fs');
const { Mixin } = require('@untool/core');
const { ApolloProvider, getDataFromTree } = require('react-apollo');
const { default: ApolloClient } = require('apollo-client');
const { HttpLink } = require('apollo-link-http');
const {
  InMemoryCache,
  IntrospectionFragmentMatcher,
  HeuristicFragmentMatcher,
} = require('apollo-cache-inmemory');

const { getConfig } = require('@untool/config');

let introspectionResult = null;
try {
  const { fragmentsFile } = getConfig();
  if (existsSync(fragmentsFile)) {
    introspectionResult = JSON.parse(readFileSync(fragmentsFile, 'utf-8'));
  }
} catch (_) {}

class GraphQLMixin extends Mixin {
  constructor(config, element, options = {}) {
    super(config, element);

    this.client = this.createClient(options);
  }

  createClient(options) {
    return new ApolloClient(this.enhanceClientOptions(options));
  }

  enhanceClientOptions(options) {
    return {
      ...options,
      link: options.link || this.createLink(),
      cache: options.cache || this.createCache(),
      ssrMode: true,
    };
  }

  createLink() {
    return new HttpLink({ uri: this.config.graphqlUri });
  }

  createCache() {
    return new InMemoryCache({ fragmentMatcher: this.createFragmentMatcher() });
  }

  createFragmentMatcher() {
    if (introspectionResult) {
      return new IntrospectionFragmentMatcher({
        introspectionQueryResultData: introspectionResult,
      });
    }
    return new HeuristicFragmentMatcher();
  }

  fetchData(data = {}, element) {
    return this.prefetchData(element).then(() => {
      return {
        ...data,
        globals: [
          ...(data.globals || []),
          {
            name: 'APOLLO_IQRD',
            value: introspectionResult,
          },
          {
            name: 'APOLLO_STATE',
            value: this.client.cache.extract(),
          },
        ],
      };
    });
  }

  prefetchData(element) {
    // TODO: check "mode" and only prefetch data when mode === 'static'
    return 'x' === 'x' ? getDataFromTree(element) : Promise.resolve();
  }

  enhanceElement(reactElement) {
    return <ApolloProvider client={this.client}>{reactElement}</ApolloProvider>;
  }
}

module.exports = GraphQLMixin;

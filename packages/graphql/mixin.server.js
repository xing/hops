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
const { fragmentsFile } = getConfig();

let introspectionResult = null;
try {
  if (existsSync(fragmentsFile)) {
    introspectionResult = JSON.parse(readFileSync(fragmentsFile, 'utf-8'));
  }
} catch (_) {
  console.warn(
    'Could not find a graphql introspection query result at %s.',
    fragmentsFile,
    'You might need to execute `hops graphql introspect`'
  );
}

class GraphQLMixin extends Mixin {
  constructor(config, element, { graphql: options = {} } = {}) {
    super(config, element);

    this.client = this.createClient(options);
    this.shouldPrefetchOnServer = undefined;
  }

  bootstrap(request, response) {
    if (response && response.locals) {
      this.shouldPrefetchOnServer = response.locals.shouldPrefetchOnServer;
    }
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
        globals: {
          ...(data.globals || {}),
          APOLLO_IRQD: introspectionResult,
          APOLLO_STATE: this.client.cache.extract(),
        },
      };
    });
  }

  prefetchData(element) {
    return this.shouldPrefetchOnServer
      ? getDataFromTree(element)
      : Promise.resolve();
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
    return <ApolloProvider client={this.client}>{reactElement}</ApolloProvider>;
  }
}

module.exports = GraphQLMixin;

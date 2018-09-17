require('isomorphic-fetch');
const { parse, join, resolve } = require('path');
const React = require('react');
const {
  Mixin,
  strategies: {
    async: { override, callable },
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
const fragments = require('./lib/fragments');

class GraphQLMixin extends Mixin {
  constructor(config, element, { graphql: options = {} } = {}) {
    super(config, element);

    this.options = options;
  }

  async bootstrap() {
    this.client = await this.createClient(this.options);
  }

  async createClient(options) {
    return await new ApolloClient(await this.enhanceClientOptions(options));
  }

  async enhanceClientOptions(options) {
    return {
      ...options,
      link: await this.getApolloLink(),
      cache: await this.getApolloCache(),
      ssrMode: true,
    };
  }

  async getApolloLink() {
    return (
      this.options.link ||
      new HttpLink({
        uri: this.config.graphqlUri,
      })
    );
  }

  async getApolloCache() {
    return (
      this.options.cache ||
      new InMemoryCache({ fragmentMatcher: await this.createFragmentMatcher() })
    );
  }

  async createFragmentMatcher() {
    this.config.fragmentsFile = resolve(
      join(parse(require.resolve('./mixin.server')).dir, 'fragmentTypes.json')
    );

    const introspectionQueryResultData = (await fragments(this.config)).data;

    return introspectionQueryResultData
      ? new IntrospectionFragmentMatcher({
          introspectionQueryResultData,
        })
      : new HeuristicFragmentMatcher();
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

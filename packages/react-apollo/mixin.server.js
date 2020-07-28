const React = require('react');
const renderToFragments = require('hops-react/lib/fragments');
const { existsSync, readFileSync } = require('fs');
const {
  Mixin,
  strategies: {
    sync: { override, callable, sequence },
  },
} = require('hops-mixin');

const { ApolloProvider, getMarkupFromTree } = require('react-apollo');
const { default: ApolloClient } = require('apollo-client');
const { HttpLink } = require('apollo-link-http');
const {
  InMemoryCache,
  IntrospectionFragmentMatcher,
  HeuristicFragmentMatcher,
} = require('apollo-cache-inmemory');
const fetch = require('cross-fetch');

let introspectionResult = undefined;

const wrapNetworkError = (error) => {
  if (!error.networkError || !error.networkError.response) {
    return error;
  }
  const { status, statusText } = error.networkError.response;
  const message = status === 200 ? 'Not Acceptable' : statusText;
  const fetchError = Object.assign(new Error(message), {
    response: error.networkError.response,
  });
  return fetchError;
};

class GraphQLMixin extends Mixin {
  constructor(config, element, { graphql: options = {} } = {}) {
    super(config, element);

    this.options = options;

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
      ssrMode: true,
    };
  }

  getApolloLink() {
    return (
      this.options.link ||
      new HttpLink({
        uri: this.config.graphqlUri,
        fetch,
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
    return !introspectionResult
      ? new HeuristicFragmentMatcher()
      : new IntrospectionFragmentMatcher({
          introspectionQueryResultData: introspectionResult,
        });
  }

  async renderToFragments(element) {
    if (this.canPrefetchOnServer().every((value) => value) === false) {
      return renderToFragments(element);
    }

    let fragments = {};
    try {
      await getMarkupFromTree({
        tree: element,
        renderFunction: (tree) => {
          fragments = renderToFragments(tree);
          return fragments.reactMarkup;
        },
      });
    } catch (err) {
      throw wrapNetworkError(err);
    }
    return fragments;
  }

  canPrefetchOnServer() {
    return this.config.allowServerSideDataFetching !== false;
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

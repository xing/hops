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

class GraphQLMixin extends Mixin {
  constructor(config, element, { graphql: options = {} } = {}) {
    super(config, element);

    this.options = options;
  }

  async bootstrap() {
    this.client = await this.createClient(this.options);
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
      })
    );
  }

  getApolloCache() {
    return (
      this.options.cache ||
      new InMemoryCache({
        fragmentMatcher: this.createFragmentMatcher(),
      }).restore(global['APOLLO_STATE'])
    );
  }

  createFragmentMatcher() {
    try {
      /* eslint-disable-next-line foundnode/no-missing-require */
      const introspectionQueryResultData = require('./fragmentTypes.json');

      return new IntrospectionFragmentMatcher({
        introspectionQueryResultData,
      });
    } catch (e) {
      return new HeuristicFragmentMatcher();
    }
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
};

module.exports = GraphQLMixin;

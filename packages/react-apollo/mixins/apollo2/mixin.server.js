import { createElement } from 'react';
import renderToFragments from 'hops-react/lib/fragments';
import { existsSync, readFileSync } from 'fs';
import { Mixin, strategies } from 'hops-mixin';
// eslint-disable-next-line node/no-extraneous-import
import { ApolloProvider, getMarkupFromTree } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
  HeuristicFragmentMatcher,
} from 'apollo-cache-inmemory';
import fetch from 'cross-fetch';

const {
  sync: { override, callable, sequence },
} = strategies;

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
    const canPrefetchOnServer =
      this.canPrefetchOnServer().every((value) => value) === true;
    const link = canPrefetchOnServer
      ? this.getApolloLink()
      : ApolloLink.empty();

    return {
      ...options,
      cache: this.getApolloCache(),
      ssrMode: canPrefetchOnServer,
      link,
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
    return createElement(
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

export default GraphQLMixin;

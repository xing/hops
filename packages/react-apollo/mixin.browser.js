import 'cross-fetch/polyfill';

import { createElement } from 'react';
import { Mixin } from 'hops-mixin';
import { override, callable } from 'mixinable';
// eslint-disable-next-line node/no-extraneous-import
import { ApolloProvider } from '@apollo/react-common';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
  HeuristicFragmentMatcher,
} from 'apollo-cache-inmemory';

export default class GraphQLMixin extends Mixin {
  constructor(config, element, { graphql: options = {} } = {}) {
    super(config, element);

    this.options = options;
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
    };
  }

  getApolloLink() {
    return (
      this.options.link ||
      new HttpLink({
        uri: this.config.graphqlUri,
        fetch: global.fetch,
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
    if (global['APOLLO_FRAGMENT_TYPES']) {
      return new IntrospectionFragmentMatcher({
        introspectionQueryResultData: global['APOLLO_FRAGMENT_TYPES'],
      });
    }
    return new HeuristicFragmentMatcher();
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
};

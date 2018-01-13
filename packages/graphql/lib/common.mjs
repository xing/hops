import 'isomorphic-fetch';

import React from 'react';
import { ApolloProvider } from 'react-apollo/index';

import ApolloClient from 'apollo-client/index';
import ApolloCache from 'apollo-cache-inmemory/index';
import ApolloLink from 'apollo-link-http/index';

import hopsConfig from 'hops-config';

export default class Common {
  constructor(options = {}) {
    this.client = this.createClient(options.graphql || {});
  }

  createClient(options) {
    return new ApolloClient(this.enhanceClientOptions(options));
  }

  enhanceClientOptions(options) {
    return Object.assign({}, options, {
      link: options.link || this.createLink(),
      cache: options.cache || this.createCache(),
    });
  }

  createLink() {
    return new ApolloLink.HttpLink({
      uri: hopsConfig.graphqlUri,
    });
  }

  createCache() {
    return new ApolloCache.InMemoryCache({
      fragmentMatcher: this.createFragmentMatcher(),
    });
  }

  createFragmentMatcher() {
    const result = this.getIntrospectionResult();
    if (result) {
      return new ApolloCache.IntrospectionFragmentMatcher({
        introspectionQueryResultData: this.getIntrospectionResult(),
      });
    } else {
      return new ApolloCache.HeuristicFragmentMatcher();
    }
  }

  enhanceElement(reactElement) {
    return React.createElement(
      ApolloProvider,
      {
        client: this.client,
      },
      reactElement
    );
  }
}

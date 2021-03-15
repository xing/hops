import { createElement } from 'react';
import renderToFragments from 'hops-react/lib/fragments';
import { existsSync, readFileSync } from 'fs';
import { Mixin, strategies } from 'hops-mixin';

import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  ApolloLink,
} from '@apollo/client';
import { getMarkupFromTree } from '@apollo/client/react/ssr';
import { InMemoryCache } from '@apollo/client/cache';
import fetch from 'cross-fetch';

const {
  sync: { override, sequence },
} = strategies;

let introspectionResult = undefined;

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
    return this.options.cache || introspectionResult
      ? new InMemoryCache({ possibleTypes: introspectionResult })
      : new InMemoryCache();
  }

  async renderToFragments(element) {
    if (this.canPrefetchOnServer().every((value) => value) === false) {
      return renderToFragments(element);
    }

    return {
      reactMarkup: await getMarkupFromTree({
        tree: element,
        renderFunction: (tree) => {
          return renderToFragments(tree).reactMarkup;
        },
      }),
    };
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
        APOLLO_STATE: this.getApolloClient().extract(),
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
  canPrefetchOnServer: sequence,
};

export default GraphQLMixin;

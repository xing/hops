import { getDataFromTree } from 'react-apollo/index';

import { combineContexts, ReactContext } from 'hops-react';

import Common from './lib/common';
import { APOLLO_STATE, APOLLO_IQRD } from './lib/constants';
import util from './lib/util';

const introspectionResult = util.getIntrospectionResult();

export class GraphQLContext extends Common {
  enhanceClientOptions(options) {
    return Object.assign(
      { ssrMode: true },
      super.enhanceClientOptions(options)
    );
  }

  getIntrospectionResult() {
    return introspectionResult;
  }

  getTemplateData(templateData, rootElement) {
    return this.prefetchData(rootElement).then(() =>
      Object.assign({}, templateData, {
        globals: [
          ...(templateData.globals || []),
          {
            name: APOLLO_IQRD,
            value: this.getIntrospectionResult(),
          },
          {
            name: APOLLO_STATE,
            value: this.client.cache.extract(),
          },
        ],
      })
    );
  }

  prefetchData(rootElement) {
    return process.env.HOPS_MODE !== 'static'
      ? getDataFromTree(rootElement)
      : Promise.resolve();
  }
}

export const contextDefinition = GraphQLContext;

export const createContext = combineContexts(ReactContext, GraphQLContext);

export const graphqlExtension = config => {
  return {
    context: GraphQLContext,
    config: {
      graphql: config,
    },
  };
};

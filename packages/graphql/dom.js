import { combineContexts, ReactContext } from 'hops-react';

import Common from './lib/common';
import { APOLLO_STATE, APOLLO_IQRD } from './lib/constants';

export class GraphQLContext extends Common {
  createCache() {
    return super.createCache().restore(global[APOLLO_STATE]);
  }

  getIntrospectionResult() {
    return global[APOLLO_IQRD];
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

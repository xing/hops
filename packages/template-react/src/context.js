// @flow
import {
  combineContexts,
  contextDefinition as reactContext
} from 'hops-react';

import {
  contextDefinition as reduxContext
} from 'hops-redux';

import {
  contextDefinition as graphqlContext
} from 'hops-graphql';

export default combineContexts(
  reactContext,
  reduxContext,
  graphqlContext
);

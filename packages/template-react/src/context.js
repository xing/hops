// @flow
import { createContext } from 'hops-react';
import reduxMixin from 'hops-redux';
import graphqlMixin from 'hops-graphql';

export default createContext.mixin(
  reduxMixin,
  graphqlMixin
);

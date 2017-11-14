// @flow
import { createContext } from 'hops-react';
import { mixin as reduxMixin } from 'hops-redux';
import { mixin as graphqlMixin } from 'hops-graphql';

export default createContext.mixin(reduxMixin, graphqlMixin);

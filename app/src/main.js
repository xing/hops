
import React, { createClass, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';

import { createAction, createReducers, render } from 'hops';

import { headline } from './style.css';

export const namespace = 'home';

export const Home = connect(
  (state) => state[namespace],
  {
    update: createAction(namespace)
  }
)(
  createClass({
    displayName: 'Home',
    propTypes: {
      greeting: PropTypes.string,
      update: PropTypes.func
    },
    componentDidMount() {
      const { update } = this.props;
      update({'greeting': {'$set': 'Hello World!'}});
    },
    render() {
      const { greeting } = this.props;
      return (
        <h1 className={ headline }>{ greeting }</h1>
      );
    }
  })
);

export const routes = (
  <Route path='/' component={ Home }/>
);
export const reducers = createReducers.add(namespace);

export default render({ routes, reducers });

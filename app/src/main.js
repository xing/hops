
import React, { createClass, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';

import { render } from 'hops';

import { headline } from './style.css';

export const namespace = 'home';
export const setActionType = 'setHome';

export const Home = connect(
  (state) => state[namespace],
  {
    update: (payload) => ({ type: setActionType, payload })
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
      update({ greeting: 'Hello World!'});
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

export const reducers = {
  [namespace]: (state = {}, action) => {
    if (action.type === setActionType) {
      return Object.assign({}, state, action.payload);
    }
    return state;
  }
};

export default render({ routes, reducers });

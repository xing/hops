
import React, { PropTypes } from 'react';
import { Route } from 'react-router';

import { createContainer, createAction, createReducer, render } from 'hops';

import { headline } from './style.css';

const namespace = 'home';

const Home = createContainer(
  (state) => state[namespace],
  {
    update: createAction(namespace)
  },
  {
    propTypes: {
      greeting: PropTypes.string,
      update: PropTypes.func
    },
    componentDidMount: function () {
      const { update } = this.props;
      update({'greeting': {'$set': 'Hello World!'}});
    },
    render: function () {
      const { greeting } = this.props;
      return (
        <h1 className={ headline }>{ greeting }</h1>
      );
    }
  }
);

const routes = (
  <Route path='/' component={ Home }/>
);
const reducers = {[namespace]: createReducer(namespace)};

export default render({ routes, reducers });

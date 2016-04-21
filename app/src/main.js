
import React, { createClass, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';

import { createAction, createReducer, render } from 'hops';

import { headline } from './style.css';

const namespace = 'home';

const Home = connect(
  (state) => state[namespace],
  {
    update: createAction(namespace)
  }
)(
  createClass({
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
  })
);

const routes = (
  <Route path='/' component={ Home }/>
);
const reducers = {[namespace]: createReducer(namespace)};

export default render({ routes, reducers });

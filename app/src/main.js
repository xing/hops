
import React, { Component, PropTypes } from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';

import { createAction, createReducer, render } from 'hops';

import { headline } from './style.css';

const namespace = 'home';
@connect(
  state => state[namespace],
  {
    update: createAction(namespace)
  }
)
class Home extends Component {
  static propTypes = {
    greeting: PropTypes.string,
    update: PropTypes.func
  };
  componentDidMount() {
    const { update } = this.props;
    update({'greeting': {'$set': 'Hello World!'}});
  }
  render() {
    const { greeting } = this.props;
    return (
      <h1 className={ headline }>{ greeting }</h1>
    );
  }
}

const routes = (
  <Route path='/' component={ Home } />
);
const reducers = {[namespace]: createReducer(namespace)};

export default render({ routes, reducers });

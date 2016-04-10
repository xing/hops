
import React, { Component, PropTypes } from 'react';
import { Route, IndexRoute } from 'react-router';
import { connect } from 'react-redux';

import { createReducer, render } from 'hops';

class App extends Component {
  static propTypes = {
    children: PropTypes.node
  };
  render() {
    const { children } = this.props;
    return (
      <div>{ children }</div>
    );
  }
}

import { headline } from './style.css';

class Headline extends Component {
  static propTypes = {
    greeting: PropTypes.string
  };
  render() {
    const { greeting } = this.props;
    return (
      <h1 className={ headline }>{ greeting }</h1>
    );
  }
}

const reducer = createReducer('home');
const { createSelector, createAction, registerReducer } = reducer;

const fetchDataAsync = dispatch => (
  new Promise(resolve => {
    setTimeout(() => {
      dispatch(createAction({
        'greeting': { '$set': 'Hello World!' }
      }));
      resolve();
    }, 1);
  })
);

@connect(createSelector())
class Home extends Component {
  static propTypes = {
    dispatch: PropTypes.func
  };
  static fetchData(dispatch) {
    return dispatch(fetchDataAsync);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    this.constructor.fetchData(dispatch);
  }
  render() {
    return (
      <Headline { ...this.props } />
    );
  }
}

const reducers = registerReducer();
const routes = (
  <Route path='/' component={ App }>
    <IndexRoute component={ Home } />
  </Route>
);
export default render({ routes, reducers });

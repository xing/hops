import { render } from 'hops';
import React from 'react';
import { connect } from 'react-redux';
import fetch from 'cross-fetch';
import { Helmet } from 'react-helmet-async';
import { Route } from 'react-router-dom';

const reducers = {
  counter(state = 0, action) {
    switch (action.type) {
      case 'INCREMENT':
        return state + action.payload;
      default:
        return state;
    }
  },
  value(state = null, action) {
    switch (action.type) {
      case 'SET_VALUE':
        return action.payload;
      default:
        return state;
    }
  },
};

const increment = () => ({ type: 'INCREMENT', payload: 1 });

const incrementFetch = () => (dispatch) => {
  return fetch('http://localhost:8901/api')
    .then((r) => r.json())
    .then(({ value }) => {
      dispatch({ type: 'INCREMENT', payload: value });
    });
};

const setParam = ({ param }) => ({ type: 'SET_VALUE', payload: param });

const setLocationPathname = (params, { location: { search } }) => {
  return {
    type: 'SET_VALUE',
    payload: search,
  };
};

const setMatchParam = (params, { match: { params: matchParams } }) => {
  return {
    type: 'SET_VALUE',
    payload: matchParams.test,
  };
};

const setConfigValue = (value) => ({ type: 'SET_VALUE', payload: value });

const Counter = ({ count, increment, val }) => (
  <>
    <Helmet>
      <link rel="icon" href="data:;base64,iVBORw0KGgo=" />
    </Helmet>
    <button onClick={increment}>+</button>
    <counter>{count}</counter>
    <value>{val}</value>
    <Route
      path="/increment"
      render={() => (
        <>
          <hr />
          <a href="#some-hash">Set location hash&hellip;</a>
        </>
      )}
    />
  </>
);

const ConnectedCounter = connect(
  ({ counter, value }) => ({ count: counter, val: value }),
  { increment }
)(Counter);

export default render(<ConnectedCounter />, {
  redux: {
    reducers,
    actionCreators: [
      {
        path: '/increment',
        action: increment,
      },
      {
        path: '/increment-fetch',
        action: incrementFetch,
      },
      {
        path: '/param-test/:param',
        action: setParam,
      },
      {
        path: '/location-test',
        action: setLocationPathname,
      },
      {
        path: '/match-test/:test',
        action: setMatchParam,
      },
      (config) => ({
        path: '/config-test',
        action: () => setConfigValue(config.port),
      }),
    ],
  },
});

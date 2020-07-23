import { render } from 'hops';
import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet-async';

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

const increment = () => ({ type: 'INCREMENT', payload: 3 });

const setValue = (value) => ({ type: 'SET_VALUE', payload: value });

const Counter = ({ count, value }) => (
  <>
    <Helmet>
      <link rel="icon" href="data:;base64,iVBORw0KGgo=" />
    </Helmet>
    <h1>{count}</h1>
    <dl>
      <dt>Arbitrary value</dt>
      <dd>{value}</dd>
    </dl>
  </>
);

const ConnectedCounter = connect(
  ({ counter, value }) => ({ count: counter, value }),
  { increment }
)(Counter);

export default render(<ConnectedCounter />, {
  redux: {
    reducers,
    actionCreators: [
      {
        path: '/',
        action: increment,
      },
      (config) => ({
        path: '/',
        action: () => setValue(config.arbitraryValue),
      }),
    ],
  },
});

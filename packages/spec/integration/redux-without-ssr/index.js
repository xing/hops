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
};

const increment = () => ({ type: 'INCREMENT', payload: 3 });

const Counter = ({ count }) => (
  <>
    <Helmet>
      <link rel="icon" href="data:;base64,iVBORw0KGgo=" />
    </Helmet>
    <h1>{count}</h1>
  </>
);

const ConnectedCounter = connect(({ counter }) => ({ count: counter }), {
  increment,
})(Counter);

export default render(<ConnectedCounter />, {
  redux: {
    reducers,
    actionCreators: [
      {
        path: '/',
        action: increment,
      },
    ],
  },
});

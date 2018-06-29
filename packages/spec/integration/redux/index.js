import { render } from 'hops-react';
import React from 'react';
import { connect } from 'react-redux';

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

const increment = () => ({ type: 'INCREMENT', payload: 1 });

const Counter = ({ count, increment }) => (
  <React.Fragment>
    <button onClick={increment}>+</button>
    <output>{count}</output>
  </React.Fragment>
);

const ConnectedCounter = connect(
  ({ counter }) => ({ count: counter }),
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
    ],
  },
});

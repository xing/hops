import React from 'react';
import PropTypes from 'prop-types';

export default function Counter({ count, increment, decrement }) {
  return (
    <div>
      <span>Clicked: {count} times</span>
      <div>
        <button onClick={increment.bind(null, 1)}>+</button>
      </div>
      <div>
        <button onClick={decrement.bind(null, 1)}>-</button>
      </div>
    </div>
  );
}

Counter.propTypes = {
  count: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
};

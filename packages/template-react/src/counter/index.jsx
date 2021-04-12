import React, { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((count) => ++count);
  };

  const decrement = () => {
    setCount((count) => --count);
  };

  return (
    <div>
      <span>Clicked: {count} times</span>
      <div>
        <button onClick={increment}>+</button>
      </div>
      <div>
        <button onClick={decrement}>-</button>
      </div>
    </div>
  );
}

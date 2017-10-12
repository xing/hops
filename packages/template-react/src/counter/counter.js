// @flow

import React from 'react';

export type Props = {
  count: number;
  increment: (amount?: number) => void;
  decrement: (amount?: number) => void;
};

export default function Counter({
  count,
  increment,
  decrement,
}: Props) {
  return (
    <div>
      <span>Clicked: {count} times</span>
      <div><button onClick={increment.bind(null, 1)}>+</button></div>
      <div><button onClick={decrement.bind(null, 1)}>-</button></div>
    </div>
  );
}

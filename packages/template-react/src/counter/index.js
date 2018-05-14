import React from 'react';

export default class Counter extends React.Component {
  state = {
    count: 0,
  };

  increment = () => {
    this.setState(state => ({ count: state.count + 1 }));
  };

  decrement = () => {
    this.setState(state => ({ count: state.count - 1 }));
  };

  render() {
    return (
      <div>
        <span>Clicked: {this.state.count} times</span>
        <div>
          <button onClick={this.increment}>+</button>
        </div>
        <div>
          <button onClick={this.decrement}>-</button>
        </div>
      </div>
    );
  }
}

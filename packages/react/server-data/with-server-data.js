import { Component as ReactComponent, createElement } from 'react';
import { Consumer } from './context';

function withServerData(Component) {
  return class WithServerData extends ReactComponent {
    render() {
      return createElement(Consumer, {}, (data) =>
        createElement(Component, { ...this.props, serverData: data })
      );
    }
  };
}

export default withServerData;

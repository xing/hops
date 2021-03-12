import { Component as ReactComponent, createElement } from 'react';
import { Consumer } from './context';

function withConfig(Component) {
  return class WithConfig extends ReactComponent {
    render() {
      return createElement(Consumer, {}, (config) =>
        createElement(Component, { ...this.props, config })
      );
    }
  };
}

export default withConfig;

import { createElement, Component as ReactComponent } from 'react';
import context from './context';

export default function withConfig(Component) {
  return class WithConfig extends ReactComponent {
    render() {
      return createElement(context.Consumer, {}, (config) =>
        createElement(Component, { ...this.props, config })
      );
    }
  };
}

import { createElement, ReactComponent } from 'react';
import context from './context';

export default function withServerData(Component) {
  return class WithServerData extends ReactComponent {
    render() {
      return createElement(context.Consumer, {}, (data) =>
        createElement(Component, { ...this.props, serverData: data })
      );
    }
  };
}

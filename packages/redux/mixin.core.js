const { Mixin } = require('hops-mixin');

module.exports = class ReduxMixin extends Mixin {
  enhanceTestElement([element, config]) {
    const React = require('react');
    const { Provider } = require('react-redux');
    const { reduxProviderProps = null } = config;
    return [React.createElement(Provider, reduxProviderProps, element), config];
  }
};

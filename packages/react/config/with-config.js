const React = require('react');
const { Consumer } = require('./context');

function withConfig(Component) {
  return class WithConfig extends React.Component {
    render() {
      return React.createElement(Consumer, {}, (config) =>
        React.createElement(Component, { ...this.props, config })
      );
    }
  };
}

module.exports = withConfig;

const React = require('react');
const { Consumer } = require('./context');

function withServerData(Component) {
  return class WithServerData extends React.Component {
    render() {
      return React.createElement(Consumer, {}, (data) =>
        React.createElement(Component, { ...this.props, serverData: data })
      );
    }
  };
}

module.exports = withServerData;

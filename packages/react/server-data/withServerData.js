const React = require('react');
const { Consumer } = require('./context');

function withServerData(Component) {
  return class WithServerData extends React.Component {
    render() {
      return (
        <Consumer>
          {data => <Component {...this.props} serverData={data} />}
        </Consumer>
      );
    }
  };
}

module.exports = withServerData;

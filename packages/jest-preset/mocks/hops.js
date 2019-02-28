const hops = require('hops/lib/runtime');
const React = require('react');
const PropTypes = require('prop-types');

const importComponent = ({ moduleId }, name = 'default') => {
  const resolve = typeof name === 'function' ? name : module => module[name];
  class Importer extends React.Component {
    constructor() {
      super();
      this.state = { Component: resolve(require(moduleId)) };
    }
    render() {
      const {
        render = ({ Component, error, loading, ...props }) => {
          return !(error || loading)
            ? React.createElement(Component, props)
            : null;
        },
        ownProps,
      } = this.props;
      return render({ ...ownProps, ...this.state });
    }
  }
  Importer.propTypes = {
    staticContext: PropTypes.object,
    ownProps: PropTypes.object.isRequired,
    loader: PropTypes.func,
    render: PropTypes.func,
  };

  //eslint-disable-next-line react/prop-types
  return function Import({ loader, render, ...ownProps }) {
    return React.createElement(Importer, {
      loader,
      render,
      ownProps,
    });
  };
};

module.exports = Object.assign(hops, { importComponent });

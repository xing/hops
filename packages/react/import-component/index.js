/* global __webpack_modules__, __webpack_require__ */
const { createElement, Component, useContext } = require('react');
const PropTypes = require('prop-types');
const deprecate = require('depd')('hops-react');
const ImportComponentContext = require('./context');

exports.importComponent = ({ load, moduleId }, name = 'default') => {
  const resolve = typeof name === 'function' ? name : (module) => module[name];

  if (typeof name === 'string' && name !== 'default') {
    deprecate(
      '[DEP002] Using a string to resolve the module of `importComponent` is deprecated and will be removed in a future major release (https://github.com/untool/untool/blob/master/DEPRECATIONS.md).'
    );
  }

  class Importer extends Component {
    constructor({ hasModules }) {
      super();
      if (hasModules || __webpack_modules__[moduleId]) {
        this.state = { Component: resolve(__webpack_require__(moduleId)) };
      } else {
        this.state = { loading: true };
      }
    }

    componentDidMount() {
      const { loader } = this.props;
      const { loading } = this.state;
      if (loading) {
        const state = { Component: null, error: null, loading: false };
        Promise.resolve()
          .then(() => (loader ? loader(load) : load()))
          .then((module) => {
            if (this._isMounted) {
              this.setState({ ...state, Component: resolve(module) });
            }
          })
          .catch((error) => {
            if (this._isMounted) {
              this.setState({ ...state, error });
            }
          });
      }

      this._isMounted = true;
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    render() {
      const {
        render = ({ Component, error, loading, ...props }) => {
          return !(error || loading) ? createElement(Component, props) : null;
        },
        ownProps,
      } = this.props;

      return render({ ...ownProps, ...this.state });
    }
  }

  Importer.propTypes = {
    hasModules: PropTypes.bool,
    ownProps: PropTypes.object.isRequired,
    loader: PropTypes.func,
    render: PropTypes.func,
  };

  function Import({ loader, render, ...ownProps }) {
    const modules = useContext(ImportComponentContext);

    if (modules) {
      modules.push(moduleId);
    }

    return createElement(Importer, {
      hasModules: Boolean(modules),
      loader,
      render,
      ownProps,
    });
  }

  Import.propTypes = {
    loader: PropTypes.func,
    render: PropTypes.func,
  };

  return Import;
};

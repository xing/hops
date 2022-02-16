/* global __webpack_modules__, __webpack_require__ */
import { createElement, Component, useContext } from 'react';

import PropTypes from 'prop-types';
import ImportComponentContext from './context';

export const importComponent = (
  { load, moduleId, chunkName },
  resolve = (module) => module.default
) => {
  class Importer extends Component {
    constructor() {
      super();
      if (__webpack_modules__[moduleId]) {
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
    ownProps: PropTypes.object.isRequired,
    loader: PropTypes.func,
    render: PropTypes.func,
  };

  function Import({ loader, render, ...ownProps }) {
    const chunks = useContext(ImportComponentContext);

    if (chunks) {
      chunks.push(chunkName());
    }

    return createElement(Importer, {
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

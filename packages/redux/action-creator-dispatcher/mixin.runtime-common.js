const React = require('react');
const PropTypes = require('prop-types');
const { matchPath, withRouter } = require('react-router-dom');

const { Mixin } = require('hops-mixin');

class Dispatcher extends React.Component {
  constructor(props) {
    super(props);

    this.previousLocation = {};
  }

  dispatchAll() {
    const { location = {} } = this.props;
    const pathnameChanged =
      location.pathname !== this.previousLocation.pathname;
    const hashChanged = location.hash !== this.previousLocation.hash;
    const onlyHashChanged = hashChanged && !pathnameChanged;
    this.previousLocation = location;

    if (onlyHashChanged) {
      return;
    }

    this.props.dispatchAll(location);
  }

  componentDidMount() {
    this.previousLocation = this.props.location;

    // after the initial page load, the actions should not be dispatched immediately again,
    // because it was already done on the server and
    // this would often lead to flickering pages, unnecessary loading spinners and network requests
    // therefore we do not dispatch the first time and only dispatch on following attempts
    // the behavior can be overridden by passing alwaysDispatchActionsOnClient:true to the options
    if (
      this.props.alwaysDispatchActionsOnClient ||
      !this.props.prefetchedOnServer
    ) {
      this.dispatchAll();
    }
  }

  componentDidUpdate() {
    this.dispatchAll();
  }

  render() {
    return this.props.children
      ? React.Children.only(this.props.children)
      : null;
  }
}

Dispatcher.propTypes = {
  dispatchAll: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  children: PropTypes.node,
  alwaysDispatchActionsOnClient: PropTypes.bool,
  prefetchedOnServer: PropTypes.bool.isRequired,
};

const RoutedDispatcher = withRouter(Dispatcher);

class ReduxActionCreatorRuntimeMixin extends Mixin {
  constructor(config, element, { redux: options = {} } = {}) {
    super(config);
    this.options = options;
  }

  dispatchAll(location) {
    const basePathRegEx = new RegExp(`^${this.config.basePath}`);
    const store = this.getReduxStore();
    const actionCreators = this.options.actionCreators || [];

    return Promise.all(
      actionCreators.map((actionCreator) => {
        const { action, path, exact = true, strict = false } = actionCreator;
        var match = matchPath(location.pathname.replace(basePathRegEx, ''), {
          path: path,
          exact: exact,
          strict: strict,
        });
        if (!match) {
          return Promise.resolve();
        }
        return store.dispatch(action(match.params, { location, match }));
      })
    );
  }

  enhanceElement(reactElement) {
    const { alwaysDispatchActionsOnClient } = this.options;
    return React.createElement(
      RoutedDispatcher,
      {
        dispatchAll: this.dispatchAll.bind(this),
        alwaysDispatchActionsOnClient: alwaysDispatchActionsOnClient,
        prefetchedOnServer: this.prefetchedOnServer,
      },
      reactElement
    );
  }
}

module.exports = ReduxActionCreatorRuntimeMixin;

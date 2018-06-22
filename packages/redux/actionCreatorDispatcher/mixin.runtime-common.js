const React = require('react');
const PropTypes = require('prop-types');
const { matchPath, withRouter } = require('react-router-dom');

const { Mixin } = require('@untool/core');

const Dispatcher = withRouter(
  // eslint-disable-next-line react/display-name
  class extends React.Component {
    static propTypes = {
      dispatchAll: PropTypes.func.isRequired,
      location: PropTypes.object.isRequired,
      children: PropTypes.node,
      alwaysDispatchActionsOnClient: PropTypes.bool,
      isStatic: PropTypes.bool.isRequired,
    };

    dispatchAll() {
      if (this.props.location) {
        this.props.dispatchAll(this.props.location);
      }
    }

    componentDidMount() {
      // after the initial page load, the actions should not be dispatched immediately again,
      // because it was already done on the server and
      // this would often lead to flickering pages, unnecessary loading spinners and network requests
      // therefore we do not dispatch the first time and only dispatch on following attempts
      // the behavior can be overridden by passing alwaysDispatchActionsOnClient:true to the Context options
      if (this.props.alwaysDispatchActionsOnClient || this.props.isStatic) {
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
);

class ReduxActionCreatorRuntimeMixin extends Mixin {
  constructor(config, element, options) {
    super(config);
    this.options = options;
  }

  dispatchAll(location) {
    const basePathRegEx = new RegExp(`^${this.config.basePath}`);
    const store = this.getReduxStore();
    const actionCreators = this.options.actionCreators || [];

    console.log(this.options);

    return Promise.all(
      actionCreators.map(actionCreator => {
        const { action, path, exact = true, strict = false } = actionCreator;
        var match = matchPath(location.pathname.replace(basePathRegEx, ''), {
          path: path,
          exact: exact,
          strict: strict,
        });
        if (!match) {
          return Promise.resolve();
        }
        return store.dispatch(action(match.params));
      })
    );
  }

  enhanceElement(reactElement) {
    return (
      <Dispatcher
        dispatchAll={this.dispatchAll.bind(this)}
        alwaysDispatchActionsOnClient={
          this.options.alwaysDispatchActionsOnClient
        }
        isStatic={this.isStatic}
      >
        {reactElement}
      </Dispatcher>
    );
  }
}

module.exports = ReduxActionCreatorRuntimeMixin;

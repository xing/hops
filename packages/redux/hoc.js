var ReactRouter = require('react-router-dom');
var ReactRedux = require('react-redux');
var withSideEffect = require('react-side-effect');

exports.withLocalAction = function (Component, createAction) {
  return ReactRouter.withRouter(
    ReactRedux.connect(
      function mapStateToProps (state, ownProps) {
        return ownProps;
      },
      function mapDispatchToProps (dispatch, ownProps) {
        return {
          act: function () {
            return dispatch(createAction(ownProps.location));
          }
        };
      }
    )(Component)
  );
};

exports.withAutomaticLocalAction = function (Component) {
  return exports.withLocalAction(
    withSideEffect(
      function reducePropsToState (propsList) {
        return propsList[propsList.length - 1];
      },
      function handleStateChangeOnClient (props) {
        return props && props.act();
      },
      function mapStateOnServer (props) {
        return undefined;
      }
    )(Component)
  );
};

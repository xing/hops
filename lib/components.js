
var React = require('react');
var ReactRedux = require('react-redux');
var shallowCompare = require('react-addons-shallow-compare');

function createComponent(spec) {
  return React.createClass(Object.assign({}, {
    shouldComponentUpdate(nextProps, nextState) {
      return shallowCompare(this, nextProps, nextState);
    }
  }, spec));
}

function createContainer(mapStateToProps, mapDispatchToProps, spec) {
  return ReactRedux.connect(mapStateToProps, mapDispatchToProps)(
    (typeof spec === 'function') ? spec : createComponent(spec)
  );
}

exports.createElement = createComponent;
exports.createContainer = createContainer;

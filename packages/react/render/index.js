const { isValidElement } = require('react');
const isPlainObject = require('is-plain-obj');
const {
  initialize,
  internal: { invariant },
} = require('hops-bootstrap');

exports.render =
  (element, options) =>
  (...args) => {
    invariant(
      isValidElement(element),
      'render(): Received invalid React element'
    );

    invariant(
      options === undefined || isPlainObject(options),
      'render(): Received invalid options'
    );

    const { render } = initialize({}, element, options);
    invariant(render, "Can't use hops-react mixin");

    return render(...args);
  };

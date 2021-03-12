import { isValidElement } from 'react';
import isPlainObject from 'is-plain-obj';
import { initialize, internal } from 'hops-bootstrap';
const { invariant } = internal;

export const render = (element, options) => (...args) => {
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

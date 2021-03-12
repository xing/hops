'use strict';

/* eslint-env browser */

import { isValidElement } from 'react';

import { unmountComponentAtNode, hydrate, render } from 'react-dom';
import isPlainObject from 'is-plain-obj';
import { override, async } from 'mixinable';
import { Mixin } from 'hops-mixin';
import { internal as bootstrap } from 'hops-bootstrap';

const { compose, parallel, pipe } = async;
const { validate, invariant } = bootstrap;

class ReactMixin extends Mixin {
  constructor(config, element, options) {
    super(config, options);
    this.element = element;
  }

  render() {
    Promise.resolve()
      .then(() => this.bootstrap())
      .then(() => this.enhanceElement(this.element))
      .then((element) =>
        this.fetchData({}, element).then(() => {
          const mountpoint = document.querySelector('[data-mountpoint]');
          const isMounted = mountpoint.hasAttribute('data-mounted');

          if (isMounted) {
            unmountComponentAtNode(mountpoint);
            render(element, mountpoint);
          } else {
            hydrate(element, mountpoint);
            mountpoint.setAttribute('data-mounted', '');
          }
        })
      );
  }
}

ReactMixin.strategies = {
  bootstrap: validate(parallel, ({ length }) => {
    invariant(length === 0, 'bootstrap(): Received unexpected argument(s)');
  }),
  enhanceElement: validate(
    compose,
    ([element]) => {
      invariant(
        isValidElement(element),
        'enhanceElement(): Received invalid React element'
      );
    },
    (result) => {
      invariant(
        isValidElement(result),
        'enhanceElement(): Returned invalid React element'
      );
    }
  ),
  fetchData: validate(
    pipe,
    ([data, element]) => {
      invariant(
        isPlainObject(data),
        'fetchData(): Received invalid data object'
      );
      invariant(
        isValidElement(element),
        'fetchData(): Received invalid React element'
      );
    },
    (result) => {
      invariant(
        isPlainObject(result),
        'fetchData(): Returned invalid data object'
      );
    }
  ),
  render: validate(override, ({ length }) => {
    invariant(length === 0, 'render(): Received unexpected argument(s)');
  }),
};

export default ReactMixin;

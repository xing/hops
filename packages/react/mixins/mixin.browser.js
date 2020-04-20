'use strict';

/* eslint-env browser */

const { createElement, isValidElement } = require('react');
const { unmountComponentAtNode, hydrate, render } = require('react-dom');
const { BrowserRouter } = require('react-router-dom');
const { HelmetProvider } = require('react-helmet-async');

const isPlainObject = require('is-plain-obj');

const {
  override,
  async: { compose, parallel, pipe },
} = require('mixinable');
const { ensureLeadingSlash, trimTrailingSlash } = require('pathifist');

const {
  Mixin,
  internal: { validate, invariant },
} = require('@untool/core');

class ReactMixin extends Mixin {
  constructor(config, element, options) {
    super(config, options);
    this.element = element;
  }
  enhanceElement(element) {
    const props = {
      ...this.options.router,
      basename: trimTrailingSlash(ensureLeadingSlash(this.config.basePath)),
    };
    return createElement(
      BrowserRouter,
      props,
      createElement(HelmetProvider, {}, element)
    );
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

module.exports = ReactMixin;

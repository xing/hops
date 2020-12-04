'use strict';

const { isValidElement } = require('react');
const isPlainObject = require('is-plain-obj');
const { override: overrideSync, async } = require('mixinable');
const { Mixin } = require('hops-mixin');
const { internal: bootstrap } = require('hops-bootstrap');
const renderToFragments = require('../lib/fragments');
const getAssets = require('../lib/assets');
const getResourceHints = require('../lib/resource-hints');
const template = require('../lib/template');

const { compose, parallel, pipe, override: overrideAsync } = async;
const { validate, invariant } = bootstrap;

class ReactMixin extends Mixin {
  constructor(config, element, options) {
    super(config, options);
    this.element = element;
  }

  bootstrap(req, res) {
    this.stats = res.locals.stats;
  }

  renderToFragments(element) {
    return renderToFragments(element);
  }

  renderTemplate(fragments, { modules }) {
    const assets = getAssets(this.stats, modules);
    const resourceHints = getResourceHints(this.stats);
    const globals = { _env: this.config._env };

    return this.getTemplateData({
      fragments,
      assets,
      globals,
      resourceHints,
    }).then((templateData) => template(templateData));
  }

  render(req, res, next) {
    return this.bootstrap(req, res)
      .then(() => this.enhanceElement(this.element))
      .then((element) =>
        this.fetchData({}, element).then(() => this.renderToFragments(element))
      )
      .then((fragments) => {
        // note: res.locals.helmetContext is set by the ReactHelmetMixin
        Object.assign(
          fragments,
          Object.entries(res.locals.helmetContext.helmet).reduce(
            (result, [key, value]) => ({ ...result, [key]: value.toString() }),
            { headPrefix: '', headSuffix: '' }
          )
        );

        // note: res.locals.router is set by the ReactRouterMixin
        const { router } = res.locals;

        if (router.miss) {
          next();
        } else {
          if (router.headers) {
            res.set(router.headers);
          }
          if (router.url) {
            res.redirect(router.status || 301, router.url);
          } else {
            res.status(router.status || 200);

            // note: res.locals.modules is set by the ImportComponentMixin
            return this.renderTemplate(fragments, {
              modules: res.locals.modules,
            }).then((page) => res.send(page));
          }
        }
      })
      .catch(next);
  }
}

ReactMixin.strategies = {
  bootstrap: validate(parallel, ([req, res]) => {
    invariant(
      req && req.app && req.url,
      'bootstrap(): Received invalid HTTP request object'
    );
    invariant(
      res && res.app && res.locals,
      'bootstrap(): Received invalid HTTP response object'
    );
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
  getTemplateData: validate(
    pipe,
    ([data]) => {
      invariant(
        isPlainObject(data),
        'getTemplateData(): Received invalid data object'
      );
    },
    (result) => {
      invariant(
        isPlainObject(result),
        'getTemplateData(): Returned invalid data object'
      );
    }
  ),
  renderToFragments: validate(
    overrideAsync,
    ([element]) => {
      invariant(
        isValidElement(element),
        'renderToFragments(): Received invalid React element'
      );
    },
    (result) => {
      invariant(
        isPlainObject(result),
        'renderToFragments(): Returned invalid result'
      );
    }
  ),
  renderTemplate: validate(
    overrideAsync,
    ([fragments, context]) => {
      invariant(
        isPlainObject(fragments),
        'renderTemplate(): Received invalid fragments object'
      );
      invariant(
        isPlainObject(context),
        'renderTemplate(): Received invalid context object'
      );
    },
    (result) => {
      invariant(
        typeof result === 'string',
        'renderTemplate(): Returned invalid result'
      );
    }
  ),
  render: validate(overrideSync, ([req, res, next]) => {
    invariant(
      req && req.app && req.url,
      'render(): Received invalid HTTP request object'
    );
    invariant(
      res && res.app && res.locals,
      'render(): Received invalid HTTP response object'
    );
    invariant(
      typeof next === 'function',
      'render(): Received invalid next() function'
    );
  }),
};

module.exports = ReactMixin;

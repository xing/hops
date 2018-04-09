import React from 'react';
import ReactDOM from 'react-dom/server';
import { StaticRouter } from 'react-router/es';
import Helmet from 'react-helmet';
import mixinable from 'mixinable';

import hopsConfig from 'hops-config';

import defaultTemplate from './lib/template';

import { createCombinedContext } from './lib/common';
export * from './lib/components';

export const combineContexts = mixinable({
  bootstrap: mixinable.async.parallel,
  enhanceElement: mixinable.async.compose,
  getTemplateData: mixinable.async.pipe,
  renderTemplate: mixinable.override,
});

export class ReactContext {
  constructor(options = {}) {
    this.routerOptions = Object.assign(
      {
        location: options.request && options.request.path,
        basename: hopsConfig.basePath,
        context: {},
      },
      options.router
    );
    this.template = options.template || defaultTemplate;
    this.assets = options.response && options.response.locals.hops.assets;
  }

  enhanceElement(reactElement) {
    return React.createElement(StaticRouter, this.routerOptions, reactElement);
  }

  getTemplateData(templateData, rootElement) {
    return Object.assign({}, templateData, {
      routerContext: this.routerOptions.context,
      globals: templateData.globals || [],
      assets: this.assets,
    });
  }

  renderTemplate(templateData) {
    return this.template(
      Object.assign({ helmet: Helmet.renderStatic() }, templateData)
    );
  }
}

export const contextDefinition = ReactContext;

export const createContext = combineContexts(ReactContext);

const cloneContext = mixinable.replicate(([initialArgs], [newArgs]) => [
  Object.assign({}, initialArgs, newArgs),
]);

const renderWithContext = (reactElement, _context) => {
  return (req, res, next) => {
    const renderContext = cloneContext(_context, {
      request: req,
      response: res,
    });
    const timings = res.locals.timings;
    timings.start('hops.react.bootstrap');
    return renderContext
      .bootstrap()
      .then(() => {
        timings.end('hops.react.bootstrap');
        timings.start('hops.react.enhanceElement');
        return renderContext.enhanceElement(reactElement);
      })
      .then(rootElement => {
        timings.end('hops.react.enhanceElement');
        timings.start('hops.react.getTemplateData');

        return renderContext
          .getTemplateData({}, rootElement)
          .then(templateData => {
            timings.end('hops.react.getTemplateData');

            return { templateData: templateData, rootElement: rootElement };
          });
      })
      .then(result => {
        timings.start('hops.react.renderTemplate');

        const templateData = result.templateData;
        const rootElement = result.rootElement;
        const markup = renderContext.renderTemplate(
          Object.assign(
            {
              markup: ReactDOM.renderToString(rootElement),
            },
            templateData
          )
        );

        timings.end('hops.react.renderTemplate');

        const routerContext = templateData.routerContext;
        routerContext.headers && res.set(routerContext.headers);

        if (routerContext.miss) {
          next();
        } else if (routerContext.url) {
          res.status(routerContext.status || 301);
          res.set('Location', routerContext.url);
          res.end();
        } else {
          res.status(routerContext.status || 200);
          res.type('html');
          res.send(markup);
        }
      })
      .catch(next);
  };
};

export const render = (reactElement, contextOrConfig) => {
  let context;
  if (mixinable.isMixinable(contextOrConfig)) {
    context = contextOrConfig;
  } else {
    context = createCombinedContext(
      contextOrConfig,
      ReactContext,
      combineContexts
    );
  }
  return renderWithContext(reactElement, context);
};

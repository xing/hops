import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';

import App from './app';

import template from './template.tpl';

import { version } from '../package.json';

export default (req, res) => {
  const context = {};
  const markup = renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );
  if (context.url) {
    res.writeHead(301, { Location: context.url });
  } else {
    res.write(template({ markup, version }));
  }
  res.end();
};

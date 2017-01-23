import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerRouter, createServerRenderContext } from 'react-router';


import App from './app';

import template from './template.tpl';

import { version } from '../package.json';


export default (req, res) => {

  const context = createServerRenderContext()

  let markup = renderToString(
    <ServerRouter location={ req.url } context={ context }>
      <App/>
    </ServerRouter>
  );

  const result = context.getResult();

  if (result.redirect) {

    res.writeHead(301, { Location: result.redirect.pathname });

    res.end();
  }
  else {
    if (result.missed) {

      res.writeHead(404);

      markup = renderToString(
        <ServerRouter location={ req.url } context={ context }>
          <App/>
        </ServerRouter>
      );
    }

    res.write(template({ markup, version }));
    res.end();
  }
};

import React from 'react'
import { renderToString } from 'react-dom/server'
import { ServerRouter, createServerRenderContext } from 'react-router'


import App from './app';

export default (req, res) => {

  return Promise.resolve().then(() => {

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
      res.write(template(markup));
      res.end();
    }
  });
};


const template = markup => (
  `<!DOCTYPE html>
  <html>
    <head>
      <title>Hops Example</title>
    </head>
    <body>
      <div id="main">${markup}</div>
      <script src="/main-${ require('../package.json').version }.js"></script>
    </body>
  </html>`
);

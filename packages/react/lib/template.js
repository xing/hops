'use strict';

const esc = require('serialize-javascript');

module.exports = ({
  fragments = {},
  globals = {},
  assets: { css = [], js = [] } = {},
}) =>
  `<!DOCTYPE html>
<html ${fragments.htmlAttributes || ''}>
  <head>
    ${fragments.headPrefix || ''}
    ${fragments.title || ''}
    ${fragments.base || ''}
    ${fragments.meta || ''}
    ${fragments.link || ''}
    ${css.map((asset) => `<link rel="stylesheet" href="${asset}" />`).join('')}
    ${fragments.style || ''}
    ${fragments.script || ''}
    ${fragments.headSuffix || ''}
  </head>
  <body ${fragments.bodyAttributes || ''}>
    <div data-mountpoint>${fragments.reactMarkup || ''}</div>
    ${fragments.noscript || ''}
    <script>
      ${Object.entries(globals)
        .map(([key, value]) => `var ${key}=${esc(value)};`)
        .join(' ')}
    </script>
    ${js.map((asset) => `<script src="${asset}"></script>`).join('')}
  </body>
</html>`;

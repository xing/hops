'use strict';

import esc from 'serialize-javascript';

const printResourceHint = ({ rel, href, htmlAs }) =>
  `<link rel="${rel}" href="${href}" ${htmlAs ? `as="${htmlAs}" ` : ''}/>`;

export default ({
  fragments = {},
  globals = {},
  assets: { css = [], js = [] } = {},
  resourceHints,
}) =>
  `<!DOCTYPE html>
<html ${fragments.htmlAttributes || ''}>
  <head>
    ${resourceHints.map(printResourceHint).join('')}
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

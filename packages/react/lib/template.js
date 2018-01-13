import esc from 'serialize-javascript';

export default ({
  helmet,
  assets,
  markup,
  globals,
  manifest,
}) => `<!doctype html>
<html ${helmet.htmlAttributes.toString()}>
<head>
${helmet.title.toString()}
${helmet.base.toString()}
${helmet.meta.toString()}
${helmet.link.toString()}
${assets.css.map(css => `<link rel="stylesheet" href="${css}" />`).join('')}
${helmet.style.toString()}
${helmet.script.toString()}
</head>
<body ${helmet.bodyAttributes.toString()}>
<div id="main">${markup}</div>
${helmet.noscript.toString()}
${globals
  .map(({ name, value }) => `<script>${name} = ${esc(value)}</script>`)
  .join('')}
${assets.js.map(js => `<script src="${js}"></script>`).join('')}
</body>
</html>
`;

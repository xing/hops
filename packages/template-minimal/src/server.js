export default config => (req, res, next) => {
  res.send(
    `<!doctype html>
<html charset="utf-8">
  <head>
      <title>Hello Hops</title>
      ${res.locals.assetsByType.css
        .map(css => `<link rel="stylesheet" href="${css}"></link>`)
        .join('')}
  </head>
  <body>
    <div id="app"></app>
    ${res.locals.assetsByType.js
      .map(js => `<script src="${js}"></script>`)
      .join('')}
  </body>
</html>
`
  );
};

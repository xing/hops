export default (req, res, next) => {
  res.send(
    `<!doctype html>
<html charset="utf-8">
  <head>
      <title>Hello Hops</title>
      ${res.locals.hops.assets.css
        .map(css => `<link rel="stylesheet" href="${css}"></link>`)
        .join('')}
  </head>
  <body>
    <div id="app"></app>
    ${res.locals.hops.assets.js
      .map(js => `<script src="${js}"></script>`)
      .join('')}
  </body>
</html>
`
  );
};

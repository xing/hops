function esc (data) {
  return JSON.stringify(data).replace(new RegExp('</', 'g'), '<\\/');
}

module.exports = function (data) {
  return [
    '<!doctype html>',
    '<html ', data.helmet.htmlAttributes.toString(), '>',
    '<head>',
    data.helmet.title.toString(),
    data.helmet.base.toString(),
    data.helmet.meta.toString(),
    data.helmet.link.toString(),
    data.assets.css.map(function (css) {
      return '<link rel="stylesheet" href="/' + css + '" />';
    }),
    data.helmet.style.toString(),
    '</head>',
    '<body ', data.helmet.bodyAttributes.toString(), '>',
    '<div id="main">', data.markup, '</div>',
    data.helmet.noscript.toString(),
    data.helmet.script.toString(),
    data.globals.map(function (global) {
      return '<script>' + global.name + ' = ' + esc(global.value) + '</script>';
    }),
    data.assets.js.map(function (js) {
      return '<script src="/' + js + '"></script>';
    }),
    '</body>',
    '</html>'
  ].join('');
};

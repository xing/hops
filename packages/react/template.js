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
    }).join(''),
    data.helmet.style.toString(),
    '</head>',
    '<body ', data.helmet.bodyAttributes.toString(), '>',
    '<div id="main">', data.markup, '</div>',
    data.helmet.noscript.toString(),
    data.helmet.script.toString(),
    data.globals.map(function (global) {
      return '<script>' + global.name + ' = ' + esc(global.value) + '</script>';
    }).join(''),
    data.manifest ? ['<script>', data.manifest, '</script>'].join('') : '',
    data.assets.js.map(function (js) {
      return '<script src="/' + js + '"></script>';
    }).join(''),
    '</body>',
    '</html>'
  ].join('');
};


var fs = require('fs');
var path = require('path');

var appRoot = require('app-root-path');
var ejs = require('ejs');

var templatePath = path.resolve(__dirname, 'template.html');
var templateString = fs.readFileSync(templatePath, 'utf8');

module.exports = {
  appRoot: appRoot.toString(),
  cssFile: (process.env.NODE_ENV === 'production') ? 'bundle.css' : null,
  cssName: '[name]-[local]-[hash:base64:5]',
  cssShared: [],
  distDir: appRoot.resolve('dist'),
  jsFile: 'bundle.js',
  noBabel: /node_modules\/(?!es-)/,
  package: appRoot.require('package.json'),
  render: ejs.compile(templateString),
  require: appRoot.require,
  resolve: appRoot.resolve,
  serviceWorker: null,
  serviceWorkerFile: null,
  shells: ['/'],
  srcDir: path.dirname(require.resolve(appRoot.toString())),
  webpackDev: path.resolve(__dirname, '..', 'etc', 'webpack.dev.js'),
  webpackBuild: path.resolve(__dirname, '..', 'etc', 'webpack.build.js')
};
try {
  Object.assign(module.exports, appRoot.require('.hopsrc') || {});
}
catch (e) {} // eslint-disable-line no-empty


var fs = require('fs');
var path = require('path');

var appRoot = require('app-root-path');
var ejs = require('ejs');

function fileExists(file) {
  try { fs.accessSync(file, fs.F_OK); return file; }
  catch (e) { return null; }
}

function getSrcDir() {
  try { return path.dirname(require.resolve(appRoot)); }
  catch (e) { return appRoot.resolve('src'); }
}

function getConfigPath(fileName, fallback) {
  var filePath = appRoot.resolve(fileName);
  var fallbackPath = require.resolve(fallback);
  return fileExists(filePath) || fallbackPath;
}

function getTemplate() {
  var templatePath = path.resolve(__dirname, 'template.html');
  return fs.readFileSync(templatePath, 'utf8');
}

function overrideConfig(config) {
  try { return Object.assign(config, appRoot.require('.hopsrc')); }
  catch (e) { return Object.assign(config, config.package.hops); }
}

module.exports = overrideConfig({
  appRoot: appRoot.toString(),
  bundleFile: appRoot.toString(),
  bundleName: 'bundle',
  cssName: '[name]-[local]-[hash:base64:5]',
  distDir: appRoot.resolve('dist'),
  eslint: getConfigPath('.eslintrc.js', '../etc/eslint.js'),
  isProd: (process.env.NODE_ENV === 'production'),
  babelIgnore: /node_modules\//,
  package: appRoot.require('package.json'),
  render: ejs.compile(getTemplate()),
  require: appRoot.require,
  resolve: appRoot.resolve,
  shells: ['/'],
  srcDir: getSrcDir(),
  stylelint: getConfigPath('.stylelintrc.js', '../etc/stylelint.js'),
  testGlob: appRoot.resolve('**/*.test.js'),
  webpackDev: getConfigPath('webpack.dev.js', '../etc/webpack.dev.js'),
  webpackBuild: getConfigPath('webpack.build.js', '../etc/webpack.build.js')
});

require('babel-register')({
  ignore: module.exports.babelIgnore
});

require('css-modules-require-hook')({
  generateScopedName: module.exports.cssName
});

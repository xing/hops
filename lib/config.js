
var fs = require('fs');
var path = require('path');

var appRoot = require('app-root-path');
var ejs = require('ejs');

function getFilePath(fileName, fallback) {
  try {
    var filePath = appRoot.resolve(fileName);
    fs.accessSync(filePath, fs.F_OK);
    return filePath;
  }
  catch (e) {
    return fallback ? path.resolve(__dirname, fallback) : null;
  }
}

function getTemplateFunc(fileName, fallback) {
  return ejs.compile(fs.readFileSync(getFilePath(fileName, fallback), 'utf-8'));
}

function getSourceDir() {
  try { return path.dirname(require.resolve(appRoot)); }
  catch (e) { return appRoot.resolve('src'); }
}

function overrideConfig(config) {
  try { return Object.assign(config, appRoot.require('.hopsrc')); }
  catch (e) { return Object.assign(config, config.package.hops); }
}

module.exports = overrideConfig({
  appRoot: appRoot.toString(),
  cssName: '[path][name]-[local]-[hash:base64:5]',
  distDir: appRoot.resolve('dist'),
  eslint: getFilePath('.eslintrc.js', '../etc/eslint.js'),
  isProd: (process.env.NODE_ENV === 'production'),
  babelIgnore: /node_modules\//,
  package: appRoot.require('package.json'),
  render: getTemplateFunc('template.html', './template.html'),
  shells: ['/'],
  srcDir: getSourceDir(),
  stylelint: getFilePath('.stylelintrc.js', '../etc/stylelint.js'),
  testGlob: appRoot.resolve('!(node_modules)/**/*.test.js'),
  webpackDev: getFilePath('webpack.dev.js', '../etc/webpack.dev.js'),
  webpackBuild: getFilePath('webpack.build.js', '../etc/webpack.build.js')
});


var fs = require('fs');
var path = require('path');

var appRoot = require('app-root-path');
var ejs = require('ejs');

function fileExists(file) {
  try {
    fs.accessSync(appRoot.resolve(file), fs.F_OK);
    return file;
  }
  catch (e) {
    return null;
  }
}

function getSrcDir() {
  try {
    return path.dirname(require.resolve(appRoot));
  }
  catch (e) {
    return appRoot.resolve('src');
  }
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
  try {
    return Object.assign(config, appRoot.require('.hopsrc'));
  }
  catch (e) {
    return Object.assign(config, config.package.hops);
  }
}

function adjustConfig(config) {
  if (config.package.worker) {
    config.workerFile = fileExists(appRoot.resolve(config.package.worker));
    config.workerName = config.package.worker ? 'worker' : null;
  }
  return config;
}

module.exports = overrideConfig(adjustConfig({
  appRoot: appRoot.toString(),
  bundleFile: appRoot.toString(),
  bundleName: 'bundle',
  cssName: '[name]-[local]-[hash:base64:5]',
  distDir: appRoot.resolve('dist'),
  eslint: getConfigPath('.eslintrc.js', '../etc/eslint.js'),
  isProd: (process.env.NODE_ENV === 'production'),
  noBabel: /node_modules\/(?!es-)/,
  package: appRoot.require('package.json'),
  render: ejs.compile(getTemplate()),
  require: appRoot.require,
  resolve: appRoot.resolve,
  shells: ['/'],
  srcDir: getSrcDir(),
  stylelint: getConfigPath('.stylelintrc.js', '../etc/stylelint.js'),
  webpackDev: getConfigPath('webpack.dev.js', '../etc/webpack.dev.js'),
  webpackBuild: getConfigPath('webpack.build.js', '../etc/webpack.build.js')
}));


var fs = require('fs');
var path = require('path');

var appRoot = require('app-root-path');
var ejs = require('ejs');

var templatePath = path.resolve(__dirname, 'template.html');
var templateString = fs.readFileSync(templatePath, 'utf8');

var srcDir;
try {
  srcDir = path.dirname(require.resolve(appRoot));
}
catch (e) {
  srcDir = appRoot.resolve('src');
}

function getConfig(fileName, fallback) {
  try {
    appRoot.require(fileName);
    return appRoot.resolve(fileName);
  }
  catch (e) {
    return require.resolve(fallback);
  }
}

module.exports = {
  appRoot: appRoot.toString(),
  bundleName: 'bundle',
  cssName: '[name]-[local]-[hash:base64:5]',
  cssShared: [],
  distDir: appRoot.resolve('dist'),
  eslint: getConfig('.eslintrc.js', '../etc/eslint.js'),
  isProd: (process.env.NODE_ENV === 'production'),
  noBabel: /node_modules\/(?!es-)/,
  package: appRoot.require('package.json'),
  render: ejs.compile(templateString),
  require: appRoot.require,
  resolve: appRoot.resolve,
  shells: ['/'],
  srcDir: srcDir,
  stylelint: getConfig('.stylelintrc.js', '../etc/stylelint.js'),
  webpackDev: getConfig('webpack.dev.js', '../etc/webpack.dev.js'),
  webpackBuild: getConfig('webpack.build.js', '../etc/webpack.build.js'),
  workerName: 'worker'
};

try {
  Object.assign(module.exports, appRoot.require('.hopsrc') || {});
}
catch (e) {
  Object.assign(module.exports, module.exports.package.hops);
}

try {
  fs.accessSync(appRoot.resolve(module.exports.package.worker), fs.F_OK);
  if (process.env.NODE_ENV !== 'production') {
    throw new Error('only supported in production');
  }
}
catch (e) {
  module.exports.package.worker = null;
  module.exports.workerName = null;
}


var config = require('../lib/config');

require('babel-register')({
  ignore: config.noBabel
});

require('css-modules-require-hook')({
  generateScopedName: config.cssName
});

var main = require(config.appRoot);
if (main.__esModule) { // eslint-disable-line no-underscore-dangle
  main = main.default;
}

module.exports = (typeof main === 'function') ? main : function () {
  return Promise.reject(new Error('invalid main export'));
};

'use strict';

var fs = require('fs');
var path = require('path');

var defaultHttpsConfig = {
  key: path.resolve(__dirname, '..', 'ssl', 'localhost.ssl.key'),
  cert: path.resolve(__dirname, '..', 'ssl', 'localhost.ssl.crt'),
  ca: path.resolve(__dirname, '..', 'ssl', 'rootca.pem')
};

function getFileContentsForPath (obj, key) {
  if (typeof obj[key] === 'string') {
    return fs.readFileSync(path.resolve(obj[key]));
  }
  return obj[key];
}

module.exports = function getHttpsConfig (hopsConfig) {
  if (!hopsConfig.https) {
    return false;
  }

  var config =
    typeof hopsConfig.https === 'object'
      ? hopsConfig.https
      : defaultHttpsConfig;

  return {
    key: getFileContentsForPath(config, 'key'),
    cert: getFileContentsForPath(config, 'cert'),
    ca: getFileContentsForPath(config, 'ca')
  };
};

'use strict';

var fs = require('fs');
var path = require('path');

var hopsConfig = require('..');

function readSSLFile (fileName) {
  var filePath = path.resolve(__dirname, '..', 'ssl', fileName);
  return fs.readFileSync(filePath);
}

module.exports = function getHttpsConfig () {
  if (!hopsConfig.https) {
    return false;
  }
  return {
    key: readSSLFile('localhost.ssl.key'),
    cert: readSSLFile('localhost.ssl.crt'),
    ca: readSSLFile('rootca.pem')
  };
};

'use strict';

var fs = require('fs');
var path = require('path');

var hopsConfig = require('hops-config');

exports.getFragmentsFile = function getFragmentsFile() {
  return path.join(hopsConfig.appDir, 'fragmentTypes.json');
};

exports.getIntrospectionResult = function getIntrospectionResult() {
  var file = exports.getFragmentsFile();
  if (fs.existsSync(file)) {
    return JSON.parse(fs.readFileSync(file));
  }
};

'use strict';

var path = require('path');

var hopsConfig = require('hops-config');

exports.getFragmentsFile = function getFragmentsFile () {
  return path.join(hopsConfig.appDir, 'fragmentTypes.json');
};

exports.getIntrospectionResult = function getIntrospectionResult () {
  var file = exports.getFragmentsFile();
  try {
    require.resolve(file);
    return require(file);
  } catch (_) {}
};

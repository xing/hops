'use strict';

var path = require('path');

var hopsConfig = require('hops-config');

exports.getFragmentsFile = function getFragmentsFile () {
  return path.join(hopsConfig.appDir, 'fragmentTypes.json');
};

'use strict';

var hopsConfig = require('hops-config');

exports.getFragmentsFile = function getFragmentsFile () {
  return [hopsConfig.appDir, 'fragmentTypes.json'].join('/');
};

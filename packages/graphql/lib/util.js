'use strict';

const fs = require('fs');
const path = require('path');

const hopsConfig = require('hops-config');

exports.getFragmentsFile = function getFragmentsFile() {
  return path.join(hopsConfig.appDir, 'fragmentTypes.json');
};

exports.getIntrospectionResult = function getIntrospectionResult() {
  const file = exports.getFragmentsFile();
  if (fs.existsSync(file)) {
    return JSON.parse(fs.readFileSync(file));
  }
};

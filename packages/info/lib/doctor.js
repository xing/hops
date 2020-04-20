'use strict';

const define = require('mixinable');

const {
  sync: { callable, sequence },
} = define;

const strategies = {
  validateConfig: callable,
  detectDuplicatePackages: callable,
  collectResults: callable,
  logResults: sequence,
};

const mixins = [
  require('./validators/config'),
  require('./validators/duplicates'),
  require('./validators/generic'),
];

exports.createDoctor = define(strategies, mixins);

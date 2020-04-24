const { define, sync } = require('mixinable');

const { callable, sequence } = sync;

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

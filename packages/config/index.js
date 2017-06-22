'use strict';

exports.buildConfig = require.resolve('./configs/build');
exports.developConfig = require.resolve('./configs/develop');
exports.nodeConfig = require.resolve('./configs/node');

exports.manifestUtil = require('./lib/manifest-util');

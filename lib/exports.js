'use strict';

module.exports = exports = require('../plugin');

exports.createRenderer = require('../renderer');

exports.createMiddleware = require('../middleware');

exports.createDevServerSetup = require('../middleware/dev-server');

exports.transpile = require('../transpiler');

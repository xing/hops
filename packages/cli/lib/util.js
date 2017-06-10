'use strict';

var npmlog = require('npmlog');

exports.logInfo = npmlog.log.bind(npmlog, 'info', 'hops');

exports.logError = npmlog.log.bind(npmlog, 'error', 'hops');

/**
 * @file lib/defaults
 *
 * @author Daniel Dembach <daniel@dmbch.net>
 * @author Gregor Adams <greg@pixelass.com>
 *
 * @module hops/defaults
 */
'use strict';

/** @type {!string} */
exports.mountPoint = 'main';

/** @type {?Object} */
exports.routes = null;

/** @type {!Object} */
exports.history = require('react-router').browserHistory;

/** @type {!Object} */
exports.initialState = global.INITIAL_STATE || {};

/** @type {!function} */
exports.createStore = require('./store').createStore;

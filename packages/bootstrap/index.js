'use strict';

const debug = require('hops-debug')('hops:bootstrap');
const { define } = require('mixinable');

const { getConfig, getMixins } = require('./lib/config');

exports.initialize = function initialize(overrides = {}, ...args) {
  const config = getConfig(overrides);
  const mixins = getMixins(config);
  const strategies = {
    ...mixins.reduce(
      (result, mixin) => ({ ...result, ...mixin.strategies }),
      {}
    ),
  };
  debug(mixins.map(({ name, strategies }) => ({ [name]: strategies })));
  return define(strategies, mixins)(config, ...args);
};

exports.internal = { getConfig, ...require('./lib/utils') };

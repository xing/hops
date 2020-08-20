'use strict';

const debug = require('debug')('hops:bootstrap');
const { define } = require('mixinable');

const { getConfig, getMixins } = require('./lib/config');

exports.initialize = function initialize(overrides = {}, ...args) {
  const config = getConfig(overrides);
  const mixins = getMixins(config);
  return exports.bootstrap(config, mixins, ...args);
};

function hasClasses(mixins) {
  return mixins.every((mixin) => mixin instanceof Object);
}

exports.bootstrap = function bootstrap(
  { _mixins, _type = 'core', _workspace, ...overrides } = {},
  ...args
) {
  const config = _mixins
    ? getConfig({
        getDefaults() {
          return {
            rootDir: overrides.rootDir || '',
            name: overrides.name || '',
            version: overrides.version || '',
            workspace: _workspace || '',
            settings: overrides,
          };
        },
        _mixins,
      })
    : getConfig(overrides);

  const mixins =
    _mixins && hasClasses(_mixins[_type]) ? _mixins[_type] : getMixins(config);

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

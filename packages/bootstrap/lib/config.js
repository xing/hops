'use strict';

const { basename, dirname, join } = require('path');

const { config: loadEnv } = require('dotenv');
const { sync: findUp } = require('find-up');

const debug = require('debug')('hops:config');

const { loadConfig } = require('./loader');
const { resolveMixins } = require('./resolver');
const { validate } = require('./validator');
const {
  environmentalize,
  placeholdify,
  merge: mergeFactory,
  getMixinSortOrder,
} = require('./utils');

const _getDefaults = () => {
  const pkgFile = findUp('package.json');
  const pkgData = require(pkgFile);
  const rootDir = dirname(pkgFile);
  const lockFile = findUp('yarn.lock', { cwd: rootDir });
  const settings = loadConfig('hops', pkgData, rootDir);

  loadEnv({ path: join(rootDir, '.env') });

  return {
    rootDir,
    name: pkgData.name || basename(rootDir),
    version: pkgData.version || '0.0.0',
    _workspace: lockFile ? dirname(lockFile) : rootDir,
    settings,
  };
};

exports.getConfig = ({
  untoolNamespace = 'hops',
  getDefaults = _getDefaults,
  _mixins,
  ...overrides
}) => {
  const { rootDir, name, version, _workspace, settings } = getDefaults();

  const defaults = {
    rootDir,
    name,
    version,
    mixins: [],
    mixinTypes: {
      core: {
        mainFiles: ['mixin.core', 'mixin'],
        mainFields: ['mixin:core', 'mixin'],
      },
    },
    configSchema: {
      rootDir: { type: 'string', minLength: 1, absolutePath: true },
      name: { type: 'string', minLength: 1 },
      version: { type: 'string', minLength: 1 },
    },
  };

  const merge = mergeFactory(getMixinSortOrder(settings, overrides));
  const raw = merge(defaults, settings, overrides);
  const { mixins, mixinTypes, configSchema, ...clean } = raw;
  const processed = environmentalize(placeholdify(clean));

  const config = {
    ...processed,
    _mixins: _mixins || resolveMixins(rootDir, mixinTypes, mixins),
    _warnings: validate(processed, configSchema),
    _workspace,
    _overrides: { untoolNamespace, ...overrides },
  };
  debug(config);
  return config;
};

exports.getMixins = ({ _mixins: mixins }) => mixins.core.map(require);

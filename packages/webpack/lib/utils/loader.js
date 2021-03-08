const escapeJS = require('jsesc');
const escapeRegExp = require('escape-string-regexp');
const { getOptions } = require('loader-utils');

const getHelpers = (type) =>
  type === 'server'
    ? `
const { dirname, join } = require('path');
const { sync: findUp } = require('find-up');
const rootDir = dirname(findUp('package.json'));
const expand = join.bind(null, rootDir);`
    : '';

const getConfig = (type, config, rootDir) =>
  escapeJS(config).replace(
    new RegExp(`'${escapeRegExp(rootDir)}(.*?)'`, 'g'),
    type === 'server' ? "expand('.$1')" : "'.$1'"
  );

const getMixins = (type, mixins) => {
  const requires = (mixins[type] || []).map(
    (mixin) => `((m) => m.default || m )(require('${escapeJS(mixin)}'))`
  );

  return `[${requires.join(',')}]`;
};

module.exports = function configLoader() {
  this.cacheable();

  const { type, mixins, config, rootDir } = getOptions(this);

  return `
${getHelpers(type)}
const configs = {};
exports.getConfig = (overrides = {}) => {
  const key = Object.keys(overrides).length ? JSON.stringify(overrides) : '_';
  if (!configs[key]) {
    const utils = require('hops-bootstrap/lib/utils');
    const { environmentalize, placeholdify, merge } = utils;
    const raw = merge(${getConfig(type, config, rootDir)}, overrides);
    configs[key] = environmentalize(placeholdify(raw), ${escapeJS(
      config.browserWhitelist
    )});
  }
  return configs[key];
};
exports.getMixins = () => ${getMixins(type, mixins)};
`.trim();
};

module.exports.path = __filename;

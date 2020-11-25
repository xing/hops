'use strict';

const { dirname, join } = require('path');

const { cosmiconfigSync: cosmiconfig } = require('cosmiconfig');
const { compatibleMessage } = require('check-error');

const { merge: mergeFactory, getMixinSortOrder } = require('./utils');
const {
  resolve,
  resolvePreset,
  isResolveError,
  isESMExportsError,
} = require('./resolver');

class Loader {
  constructor(pkgData) {
    this.pkgData = pkgData;
  }
  load(context, module) {
    const { load } = cosmiconfig('hops');
    const presetJsFilePath = resolvePreset(context, module);
    const loadedPreset = load(presetJsFilePath);
    return loadedPreset;
  }
  search(stopDir) {
    const { search } = cosmiconfig('hops', { stopDir });
    return search(stopDir);
  }
  loadPreset(context, preset) {
    try {
      return this.load(context, preset);
    } catch (error) {
      if (!isResolveError(error)) throw error;
      try {
        return this.search(dirname(resolve(context, `${preset}/package.json`)));
      } catch (error) {
        if (!(isResolveError(error) || isESMExportsError(error))) throw error;
        throw new Error(`Can't find preset '${preset}' in '${context}'`);
      }
    }
  }
  loadPresets(context, merge, presets = []) {
    return presets.reduce((result, preset) => {
      const { config, filepath } = this.loadPreset(context, preset);
      const directory = dirname(filepath);
      if (config.mixins) {
        config.mixins = config.mixins.map((mixin) =>
          mixin.startsWith('.') ? join(directory, mixin) : mixin
        );
      }
      return merge(
        result,
        this.loadPresets(directory, merge, config.presets),
        config
      );
    }, {});
  }
  loadSettings(context) {
    const result = this.search(context);
    const settings = { ...(result && result.config) };
    if (!settings.presets) {
      settings.presets = this.getDependencies().filter((dep) => {
        try {
          return !!this.loadPreset(context, dep);
        } catch (error) {
          if (!compatibleMessage(error, /^Can't find preset/)) throw error;
        }
      });
    }
    return settings;
  }
  getDependencies() {
    const { dependencies = {}, devDependencies = {} } = this.pkgData;
    return [
      ...Object.keys(dependencies),
      ...(process.env.NODE_ENV !== 'production'
        ? Object.keys(devDependencies)
        : []),
    ];
  }
}

exports.loadConfig = (pkgData, rootDir) => {
  const loader = new Loader(pkgData);

  const settings = loader.loadSettings(rootDir);
  settings.presets = settings.presets.filter(
    (preset) => !(settings.ignoredPresets || []).includes(preset)
  );
  const merge = mergeFactory(getMixinSortOrder(settings));
  const presets = loader.loadPresets(rootDir, merge, settings.presets);

  // eslint-disable-next-line no-unused-vars
  const { presets: _, ...config } = merge(presets, settings);
  return config;
};

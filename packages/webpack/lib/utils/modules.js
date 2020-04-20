'use strict';

const { join, delimiter, isAbsolute } = require('path');

module.exports = function getModules(rootDir) {
  const modules = (process.env.NODE_PATH || '')
    .split(delimiter)
    .filter((folder) => folder && !isAbsolute(folder))
    .map((folder) => join(rootDir, folder));

  return ['node_modules'].concat(modules).filter(Boolean);
};

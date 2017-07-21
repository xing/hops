'use strict';

var slug = require('slug');

module.exports = function getEntry (entry) {
  return Object.defineProperty(
    {},
    slug(process.env.npm_package_name || 'main'),
    {
      value: entry,
      enumerable: true
    }
  );
};

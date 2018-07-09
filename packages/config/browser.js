module.exports = require('@untool/core/lib/env').environmentalize(
  require('@untool/webpack/lib/shims/loader').getConfigAndMixins().config
);

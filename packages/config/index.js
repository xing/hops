process.env.UNTOOL_NSP = 'hops';

module.exports = require('@untool/core/lib/env').environmentalize(
  require('@untool/core/lib/config').getConfig({ configNamespace: 'hops' })
);

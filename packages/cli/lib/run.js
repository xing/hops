'use strict';

process.env.UNTOOL_NSP = 'hops';

// @untool/yargs is a dependency of hops-preset-defaults and should already be
// installed in the project where the local CLI is executed.
/* eslint-disable-next-line node/no-extraneous-require */
module.exports = require('@untool/yargs').run;

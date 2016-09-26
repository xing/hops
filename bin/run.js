#!/usr/bin/env node
'use strict';

var util = require('util');

var command = process.argv[2] || process.env.npm_lifecycle_event;

// eslint-disable-next-line no-console
console.log(util.format(
  'hops@%s: %s',
  require('../package.json').version,
  command
));

require('../scripts').runScript(command + '.js');

#!/usr/bin/env node
'use strict';

const { configure } = require('@untool/yargs');

configure({
  untoolNamespace: 'hops',
  mixins: [__dirname],
}).run();

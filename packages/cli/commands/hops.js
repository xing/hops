#!/usr/bin/env node
'use strict';

const { join } = require('path');
const { configure } = require('@untool/yargs');

configure({
  untoolNamespace: 'hops',
  mixins: [join(__dirname, '..')],
}).run();

#!/usr/bin/env node
'use strict';

const { dirname, join } = require('path');
const { configure } = require('@untool/yargs');

configure({
  untoolNamespace: 'hops',
  mixins: [join(__dirname, '..')],
}).run();

#!/usr/bin/env node
'use strict';
const path = require('path');
const { configure } = require('@untool/yargs');

configure({
  untoolNamespace: 'hops',
  mixins: [path.join(__dirname, 'mixins', 'analyzer')],
}).run();

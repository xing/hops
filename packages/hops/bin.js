#!/usr/bin/env node
'use strict';
const path = require('path');
const { configure } = require('hops-yargs');

configure({
  untoolNamespace: 'hops',
  mixins: [path.join(__dirname, 'mixins', 'analyzer')],
}).run();

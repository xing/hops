#!/usr/bin/env node
'use strict';
const path = require('path');
const { configure } = require('hops-yargs');

configure({
  mixins: [path.join(__dirname, 'mixins', 'analyzer')],
}).run();

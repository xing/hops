'use strict';

process.env.UNTOOL_NSP = 'hops';
require('dotenv').config();

module.exports = require('@untool/yargs').run;

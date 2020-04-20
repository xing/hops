'use strict';

const { join } = require('path');

module.exports = {
  mixins: [
    join(__dirname, 'mixins', 'log'),
    join(__dirname, 'mixins', 'doctor'),
  ],
};

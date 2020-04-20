'use strict';
/* eslint-env browser */

if (typeof window.EventSource === 'undefined') {
  window.EventSource = require('event-source-polyfill').EventSourcePolyfill;
}

require('webpack-hot-middleware/client');

require('./build');

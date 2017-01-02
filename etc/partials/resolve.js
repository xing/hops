'use strict';

var appRoot = require('app-root-path');


exports.default = {
  alias: {
    'hops-entry-point': appRoot.toString()
  },
  mainFields: ['hopsBrowser', 'browser', 'main'],
  extensions: ['.js', '.jsx']
};

exports.render = Object.assign({}, exports.default, {
  mainFields: ['hopsServer', 'server', 'main']
});

'use strict';

var mixin = require('mixinable');

exports.Context = mixin({
  constructor: function (options) {
    this.options = options || {};
    this.initialize(this.options);
  },
  initialize: mixin.sequence(),
  bootstrap: mixin.parallel(Promise.resolve.bind(Promise)),
  enhanceElement: mixin.pipe(Promise.resolve.bind(Promise)),
  getTemplateData: mixin.pipe()
});

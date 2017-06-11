'use strict';

exports.Context = function Context (options) {
  this.options = options || {};
  this.initialize(this.options);
};

exports.Context.extend = function (protoExtension, staticExtension) {
  var parent = this;
  var Context = function (options) {
    if (!(this instanceof Context)) {
      return new Context(options);
    }
    parent.call(this, options);
  };
  return Object.assign(Context, parent, staticExtension, {
    prototype: Object.assign(
      Object.create(parent.prototype),
      protoExtension,
      {
        constructor: Context
      }
    )
  });
};

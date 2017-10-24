
var common = require('./lib/common');

exports.Context = exports.createContext = common.Context.extend({
  getIntrospectionResult: function () {
    return global[common.INTROSPECTION_RESULT];
  }
});

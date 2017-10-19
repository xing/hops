var ReactApollo = require('react-apollo');
var merge = require('merge-options');

var Context = require('./common').Context;

exports.Context = exports.createContext = Context.extend({
  bootstrap: function (enhancedComponent) {
    return ReactApollo.getDataFromTree(enhancedComponent);
  },
  createClient: function (options) {
    return Context.prototype.createClient.call(this, merge(
      options,
      {
        ssrMode: true
      }
    ));
  }
});
